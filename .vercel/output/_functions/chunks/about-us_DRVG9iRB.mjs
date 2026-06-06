import { s as sanityClient } from './page-ssr_DmB2BbQ8.mjs';
import { c as createComponent } from './astro-component_DlePoCU4.mjs';
import { m as maybeRenderHead, s as spreadAttributes, o as renderSlot, k as renderTemplate, p as renderComponent, h as addAttribute } from './entrypoint_CiK2YbrO.mjs';
import { A as ABOUT_QUERY, u as urlForImage, r as renderScript, $ as $$Layout } from './global_CxjpIDqN.mjs';
import 'clsx';

function isPortableTextSpan(node) {
	return node._type === "span" && "text" in node && typeof node.text == "string" && (node.marks === void 0 || Array.isArray(node.marks) && node.marks.every((mark) => typeof mark == "string"));
}
function isPortableTextBlock(node) {
	return typeof node._type == "string" && node._type[0] !== "@" && (!("markDefs" in node) || !node.markDefs || Array.isArray(node.markDefs) && node.markDefs.every((def) => typeof def._key == "string")) && "children" in node && Array.isArray(node.children) && node.children.every((child) => typeof child == "object" && "_type" in child);
}
function isPortableTextListItemBlock(block) {
	return isPortableTextBlock(block) && "listItem" in block && typeof block.listItem == "string" && (block.level === void 0 || typeof block.level == "number");
}
function isPortableTextToolkitList(block) {
	return block._type === "@list";
}
function isPortableTextToolkitSpan(span) {
	return span._type === "@span";
}
function isPortableTextToolkitTextNode(node) {
	return node._type === "@text";
}
const knownDecorators = [
	"strong",
	"em",
	"code",
	"underline",
	"strike-through"
];
function sortMarksByOccurences(span, index, blockChildren) {
	if (!isPortableTextSpan(span) || !span.marks || !span.marks.length) return [];
	let marks = span.marks.slice(), occurences = {};
	return marks.forEach((mark) => {
		occurences[mark] = 1;
		for (let siblingIndex = index + 1; siblingIndex < blockChildren.length; siblingIndex++) {
			let sibling = blockChildren[siblingIndex];
			if (sibling && isPortableTextSpan(sibling) && Array.isArray(sibling.marks) && sibling.marks.indexOf(mark) !== -1) occurences[mark]++;
			else break;
		}
	}), marks.sort((markA, markB) => sortMarks(occurences, markA, markB));
}
function sortMarks(occurences, markA, markB) {
	let aOccurences = occurences[markA], bOccurences = occurences[markB];
	if (aOccurences !== bOccurences) return bOccurences - aOccurences;
	let aKnownPos = knownDecorators.indexOf(markA), bKnownPos = knownDecorators.indexOf(markB);
	return aKnownPos === bKnownPos ? markA.localeCompare(markB) : aKnownPos - bKnownPos;
}
function buildMarksTree(block) {
	let { children } = block, markDefs = block.markDefs ?? [];
	if (!children || !children.length) return [];
	let sortedMarks = children.map(sortMarksByOccurences), rootNode = {
		_type: "@span",
		children: [],
		markType: "<unknown>"
	}, nodeStack = [rootNode];
	for (let i = 0; i < children.length; i++) {
		let span = children[i];
		if (!span) continue;
		let marksNeeded = sortedMarks[i] || [], pos = 1;
		if (nodeStack.length > 1) for (; pos < nodeStack.length; pos++) {
			let mark = nodeStack[pos]?.markKey || "", index = marksNeeded.indexOf(mark);
			if (index === -1) break;
			marksNeeded.splice(index, 1);
		}
		nodeStack = nodeStack.slice(0, pos);
		let currentNode = nodeStack[nodeStack.length - 1];
		if (currentNode) {
			for (let markKey of marksNeeded) {
				let markDef = markDefs?.find((def) => def._key === markKey), node = {
					_type: "@span",
					_key: span._key,
					children: [],
					markDef,
					markType: markDef ? markDef._type : markKey,
					markKey
				};
				currentNode.children.push(node), nodeStack.push(node), currentNode = node;
			}
			if (isPortableTextSpan(span)) {
				let lines = span.text.split("\n");
				for (let line = lines.length; line-- > 1;) lines.splice(line, 0, "\n");
				currentNode.children = currentNode.children.concat(lines.map((text) => ({
					_type: "@text",
					text
				})));
			} else currentNode.children = currentNode.children.concat(span);
		}
	}
	return rootNode.children;
}
function nestLists(blocks, mode) {
	let tree = [], currentList;
	for (let i = 0; i < blocks.length; i++) {
		let block = blocks[i];
		if (block) {
			if (!isPortableTextListItemBlock(block)) {
				tree.push(block), currentList = void 0;
				continue;
			}
			if (!currentList) {
				currentList = listFromBlock(block, i, mode), tree.push(currentList);
				continue;
			}
			if (blockMatchesList(block, currentList)) {
				currentList.children.push(block);
				continue;
			}
			if ((block.level || 1) > currentList.level) {
				let newList = listFromBlock(block, i, mode);
				if (mode === "html") {
					let lastListItem = currentList.children[currentList.children.length - 1], newLastChild = {
						...lastListItem,
						children: [...lastListItem.children, newList]
					};
					currentList.children[currentList.children.length - 1] = newLastChild;
				} else currentList.children.push(newList);
				currentList = newList;
				continue;
			}
			if ((block.level || 1) < currentList.level) {
				let matchingBranch = tree[tree.length - 1], match = matchingBranch && findListMatching(matchingBranch, block);
				if (match) {
					currentList = match, currentList.children.push(block);
					continue;
				}
				currentList = listFromBlock(block, i, mode), tree.push(currentList);
				continue;
			}
			if (block.listItem !== currentList.listItem) {
				let matchingBranch = tree[tree.length - 1], match = matchingBranch && findListMatching(matchingBranch, { level: block.level || 1 });
				if (match && match.listItem === block.listItem) {
					currentList = match, currentList.children.push(block);
					continue;
				} else {
					currentList = listFromBlock(block, i, mode), tree.push(currentList);
					continue;
				}
			}
			console.warn("Unknown state encountered for block", block), tree.push(block);
		}
	}
	return tree;
}
function blockMatchesList(block, list) {
	return (block.level || 1) === list.level && block.listItem === list.listItem;
}
function listFromBlock(block, index, mode) {
	return {
		_type: "@list",
		_key: `${block._key || `${index}`}-parent`,
		mode,
		level: block.level || 1,
		listItem: block.listItem,
		children: [block]
	};
}
function findListMatching(rootNode, matching) {
	let level = matching.level || 1, style = matching.listItem || "normal", filterOnType = typeof matching.listItem == "string";
	if (isPortableTextToolkitList(rootNode) && (rootNode.level || 1) === level && filterOnType && (rootNode.listItem || "normal") === style) return rootNode;
	if (!("children" in rootNode)) return;
	let node = rootNode.children[rootNode.children.length - 1];
	return node && !isPortableTextSpan(node) ? findListMatching(node, matching) : void 0;
}
const LIST_NEST_MODE_HTML = "html";

function isComponent(it) {
  return typeof it === "function";
}
function mergeComponents(components, overrides) {
  const cmps = { ...components };
  for (const [key, override] of Object.entries(overrides)) {
    const current = components[key];
    const value = !current || isComponent(override) || isComponent(current) ? override : {
      ...current,
      ...override
    };
    cmps[key] = value;
  }
  return cmps;
}
const nodeComponentsMap = /* @__PURE__ */ new WeakMap();
function setNodeComponents(node, Default, Unknown) {
  nodeComponentsMap.set(node, { Default, Unknown });
}
function getNodeComponents(node) {
  return nodeComponentsMap.get(node);
}

const getTemplate = (prop, type) => `PortableText [components.${prop}] is missing "${type}"`;
const unknownTypeWarning = (type) => getTemplate("type", type);
const unknownMarkWarning = (markType) => getTemplate("mark", markType);
const unknownBlockWarning = (style) => getTemplate("block", style);
const unknownListWarning = (listItem) => getTemplate("list", listItem);
const unknownListItemWarning = (listStyle) => getTemplate("listItem", listStyle);
const getWarningMessage = (nodeType, type) => {
  const fncs = {
    block: unknownBlockWarning,
    list: unknownListWarning,
    listItem: unknownListItemWarning,
    mark: unknownMarkWarning,
    type: unknownTypeWarning
  };
  return fncs[nodeType](type);
};
function printWarning(message) {
  console.warn(message);
}

const key = Symbol("astro-portabletext");
function usePortableText(node) {
  if (!(key in globalThis)) {
    throw new Error(`PortableText "context" has not been initialised`);
  }
  return globalThis[key](node);
}

const $$Block = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Block;
  const props = Astro2.props;
  const { node, index, isInline, ...attrs } = props;
  const styleIs = (style) => style === node.style;
  const { getUnknownComponent } = usePortableText(node);
  const UnknownStyle = getUnknownComponent();
  return renderTemplate`${styleIs("h1") ? renderTemplate`${maybeRenderHead()}<h1${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h1>` : styleIs("h2") ? renderTemplate`<h2${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h2>` : styleIs("h3") ? renderTemplate`<h3${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h3>` : styleIs("h4") ? renderTemplate`<h4${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h4>` : styleIs("h5") ? renderTemplate`<h5${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h5>` : styleIs("h6") ? renderTemplate`<h6${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h6>` : styleIs("blockquote") ? renderTemplate`<blockquote${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</blockquote>` : styleIs("normal") ? renderTemplate`<p${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</p>` : renderTemplate`${renderComponent($$result, "UnknownStyle", UnknownStyle, { ...props }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`}`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/node_modules/.pnpm/astro-portabletext@0.13.0_astro@6.4.4_@types+node@25.0.2_@vercel+functions@3.6.2_jiti@2_86448f5a9a5f65304f64a185c4243aa1/node_modules/astro-portabletext/components/Block.astro", void 0);

const $$HardBreak = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<br>`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/node_modules/.pnpm/astro-portabletext@0.13.0_astro@6.4.4_@types+node@25.0.2_@vercel+functions@3.6.2_jiti@2_86448f5a9a5f65304f64a185c4243aa1/node_modules/astro-portabletext/components/HardBreak.astro", void 0);

const $$List = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$List;
  const { node, index, isInline, ...attrs } = Astro2.props;
  const listItemIs = (listItem) => listItem === node.listItem;
  return renderTemplate`${listItemIs("menu") ? renderTemplate`${maybeRenderHead()}<menu${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</menu>` : listItemIs("number") ? renderTemplate`<ol${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ol>` : renderTemplate`<ul${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ul>`}`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/node_modules/.pnpm/astro-portabletext@0.13.0_astro@6.4.4_@types+node@25.0.2_@vercel+functions@3.6.2_jiti@2_86448f5a9a5f65304f64a185c4243aa1/node_modules/astro-portabletext/components/List.astro", void 0);

const $$ListItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ListItem;
  const { node, index, isInline, ...attrs } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</li>`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/node_modules/.pnpm/astro-portabletext@0.13.0_astro@6.4.4_@types+node@25.0.2_@vercel+functions@3.6.2_jiti@2_86448f5a9a5f65304f64a185c4243aa1/node_modules/astro-portabletext/components/ListItem.astro", void 0);

const $$Mark = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Mark;
  const props = Astro2.props;
  const { node, index, isInline, ...attrs } = props;
  const markTypeIs = (markType) => markType === node.markType;
  const { getUnknownComponent } = usePortableText(node);
  const UnknownMarkType = getUnknownComponent();
  return renderTemplate`${markTypeIs("code") ? renderTemplate`${maybeRenderHead()}<code${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</code>` : markTypeIs("em") ? renderTemplate`<em${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</em>` : markTypeIs("link") ? renderTemplate`<a${addAttribute(node.markDef.href, "href")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</a>` : markTypeIs("strike-through") ? renderTemplate`<del${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</del>` : markTypeIs("strong") ? renderTemplate`<strong${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</strong>` : markTypeIs("underline") ? renderTemplate`<span style="text-decoration: underline;"${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</span>` : renderTemplate`${renderComponent($$result, "UnknownMarkType", UnknownMarkType, { ...props }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`}`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/node_modules/.pnpm/astro-portabletext@0.13.0_astro@6.4.4_@types+node@25.0.2_@vercel+functions@3.6.2_jiti@2_86448f5a9a5f65304f64a185c4243aa1/node_modules/astro-portabletext/components/Mark.astro", void 0);

const $$Text = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Text;
  const { node } = Astro2.props;
  return renderTemplate`${node.text}`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/node_modules/.pnpm/astro-portabletext@0.13.0_astro@6.4.4_@types+node@25.0.2_@vercel+functions@3.6.2_jiti@2_86448f5a9a5f65304f64a185c4243aa1/node_modules/astro-portabletext/components/Text.astro", void 0);

const $$UnknownBlock = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<p data-portabletext-unknown="block">${renderSlot($$result, $$slots["default"])}</p>`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/node_modules/.pnpm/astro-portabletext@0.13.0_astro@6.4.4_@types+node@25.0.2_@vercel+functions@3.6.2_jiti@2_86448f5a9a5f65304f64a185c4243aa1/node_modules/astro-portabletext/components/UnknownBlock.astro", void 0);

const $$UnknownList = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<ul data-portabletext-unknown="list">${renderSlot($$result, $$slots["default"])}</ul>`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/node_modules/.pnpm/astro-portabletext@0.13.0_astro@6.4.4_@types+node@25.0.2_@vercel+functions@3.6.2_jiti@2_86448f5a9a5f65304f64a185c4243aa1/node_modules/astro-portabletext/components/UnknownList.astro", void 0);

const $$UnknownListItem = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<li data-portabletext-unknown="listitem">${renderSlot($$result, $$slots["default"])}</li>`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/node_modules/.pnpm/astro-portabletext@0.13.0_astro@6.4.4_@types+node@25.0.2_@vercel+functions@3.6.2_jiti@2_86448f5a9a5f65304f64a185c4243aa1/node_modules/astro-portabletext/components/UnknownListItem.astro", void 0);

const $$UnknownMark = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<span data-portabletext-unknown="mark">${renderSlot($$result, $$slots["default"])}</span>`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/node_modules/.pnpm/astro-portabletext@0.13.0_astro@6.4.4_@types+node@25.0.2_@vercel+functions@3.6.2_jiti@2_86448f5a9a5f65304f64a185c4243aa1/node_modules/astro-portabletext/components/UnknownMark.astro", void 0);

const $$UnknownType = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$UnknownType;
  const { node, isInline } = Astro2.props;
  const warning = getWarningMessage("type", node._type);
  return renderTemplate`${isInline ? renderTemplate`${maybeRenderHead()}<span style="display:none" data-portabletext-unknown="type">${warning}</span>` : renderTemplate`<div style="display:none" data-portabletext-unknown="type">${warning}</div>`}`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/node_modules/.pnpm/astro-portabletext@0.13.0_astro@6.4.4_@types+node@25.0.2_@vercel+functions@3.6.2_jiti@2_86448f5a9a5f65304f64a185c4243aa1/node_modules/astro-portabletext/components/UnknownType.astro", void 0);

const $$PortableText = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PortableText;
  const {
    value,
    components: componentOverrides = {},
    listNestingMode = LIST_NEST_MODE_HTML,
    onMissingComponent = true
  } = Astro2.props;
  const components = mergeComponents(
    {
      type: {},
      unknownType: $$UnknownType,
      block: {
        h1: $$Block,
        h2: $$Block,
        h3: $$Block,
        h4: $$Block,
        h5: $$Block,
        h6: $$Block,
        blockquote: $$Block,
        normal: $$Block
      },
      unknownBlock: $$UnknownBlock,
      list: {
        bullet: $$List,
        number: $$List,
        menu: $$List
      },
      unknownList: $$UnknownList,
      listItem: {
        bullet: $$ListItem,
        number: $$ListItem,
        menu: $$ListItem
      },
      unknownListItem: $$UnknownListItem,
      mark: {
        code: $$Mark,
        em: $$Mark,
        link: $$Mark,
        "strike-through": $$Mark,
        strong: $$Mark,
        underline: $$Mark
      },
      unknownMark: $$UnknownMark,
      text: $$Text,
      hardBreak: $$HardBreak
    },
    componentOverrides
  );
  const noop = () => {
  };
  const missingComponentHandler = ((handler) => {
    if (typeof handler === "function") {
      return handler;
    }
    return !handler ? noop : printWarning;
  })(onMissingComponent);
  const asComponentProps = (node, index, isInline) => ({
    node,
    index,
    isInline
  });
  const provideComponent = (nodeType, type, fallbackComponent) => {
    const component = ((component2) => {
      return component2[type] || component2;
    })(components[nodeType]);
    if (isComponent(component)) {
      return component;
    }
    missingComponentHandler(getWarningMessage(nodeType, type), {
      nodeType,
      type
    });
    return fallbackComponent;
  };
  let fallbackRenderOptions;
  const portableTextRender = (options, isInline) => {
    if (!fallbackRenderOptions) {
      throw new Error(
        "[PortableText portableTextRender] fallbackRenderOptions is undefined"
      );
    }
    const renderChildren = (children, inline = false) => {
      return children?.map(portableTextRender(options, inline)) ?? [];
    };
    const renderOptions = { ...fallbackRenderOptions, ...options ?? {} };
    return function renderNode(node, index) {
      function run(handler, props) {
        if (!isComponent(handler)) {
          throw new Error(
            `[PortableText render] No handler found for node type ${node._type}.`
          );
        }
        return handler(props);
      }
      if (isPortableTextToolkitList(node)) {
        const UnknownComponent2 = components.unknownList ?? $$UnknownList;
        setNodeComponents(node, $$List, UnknownComponent2);
        return run(renderOptions.list, {
          Component: provideComponent("list", node.listItem, UnknownComponent2),
          props: asComponentProps(node, index, false),
          children: renderChildren(node.children, false)
        });
      }
      if (isPortableTextListItemBlock(node)) {
        const { listItem, ...blockNode } = node;
        const isStyled = node.style && node.style !== "normal";
        node.children = isStyled ? renderNode(blockNode, index) : buildMarksTree(node);
        const UnknownComponent2 = components.unknownListItem ?? $$UnknownListItem;
        setNodeComponents(node, $$ListItem, UnknownComponent2);
        return run(renderOptions.listItem, {
          Component: provideComponent(
            "listItem",
            node.listItem,
            UnknownComponent2
          ),
          props: asComponentProps(node, index, false),
          children: isStyled ? node.children : renderChildren(node.children, true)
        });
      }
      if (isPortableTextToolkitSpan(node)) {
        const UnknownComponent2 = components.unknownMark ?? $$UnknownMark;
        setNodeComponents(node, $$Mark, UnknownComponent2);
        return run(renderOptions.mark, {
          Component: provideComponent("mark", node.markType, UnknownComponent2),
          props: asComponentProps(node, index, true),
          children: renderChildren(node.children, true)
        });
      }
      if (isPortableTextBlock(node)) {
        node.style ??= "normal";
        node.children = buildMarksTree(node);
        const UnknownComponent2 = components.unknownBlock ?? $$UnknownBlock;
        setNodeComponents(node, $$Block, UnknownComponent2);
        return run(renderOptions.block, {
          Component: provideComponent("block", node.style, UnknownComponent2),
          props: asComponentProps(node, index, false),
          children: renderChildren(node.children, true)
        });
      }
      if (isPortableTextToolkitTextNode(node)) {
        const isHardBreak = "\n" === node.text;
        const props = asComponentProps(node, index, true);
        if (isHardBreak) {
          return run(renderOptions.hardBreak, {
            Component: isComponent(components.hardBreak) ? components.hardBreak : $$HardBreak,
            props
          });
        }
        return run(renderOptions.text, {
          Component: isComponent(components.text) ? components.text : $$Text,
          props
        });
      }
      const UnknownComponent = components.unknownType ?? $$UnknownType;
      return run(renderOptions.type, {
        Component: provideComponent("type", node._type, UnknownComponent),
        props: asComponentProps(
          node,
          index,
          isInline ?? false
          /* default to block */
        )
      });
    };
  };
  globalThis[key] = (node) => ({
    getDefaultComponent: provideDefaultComponent.bind(null, node),
    getUnknownComponent: provideUnknownComponent.bind(null, node),
    render: (options) => node.children?.map(portableTextRender(options))
  });
  const provideDefaultComponent = (node) => {
    const DefaultComponent = getNodeComponents(node)?.Default;
    if (DefaultComponent) return DefaultComponent;
    if (isPortableTextToolkitList(node)) return $$List;
    if (isPortableTextListItemBlock(node)) return $$ListItem;
    if (isPortableTextToolkitSpan(node)) return $$Mark;
    if (isPortableTextBlock(node)) return $$Block;
    if (isPortableTextToolkitTextNode(node)) {
      return "\n" === node.text ? $$HardBreak : $$Text;
    }
    return $$UnknownType;
  };
  const provideUnknownComponent = (node) => {
    const UnknownComponent = getNodeComponents(node)?.Unknown;
    if (UnknownComponent) return UnknownComponent;
    if (isPortableTextToolkitList(node)) {
      return components.unknownList ?? $$UnknownList;
    }
    if (isPortableTextListItemBlock(node)) {
      return components.unknownListItem ?? $$UnknownListItem;
    }
    if (isPortableTextToolkitSpan(node)) {
      return components.unknownMark ?? $$UnknownMark;
    }
    if (isPortableTextBlock(node)) {
      return components.unknownBlock ?? $$UnknownBlock;
    }
    if (!isPortableTextToolkitTextNode(node)) {
      return components.unknownType ?? $$UnknownType;
    }
    throw new Error(
      `[PortableText getUnknownComponent] Unable to provide component with node type ${node._type}`
    );
  };
  const blocks = Array.isArray(value) ? value : value ? [value] : [];
  const nodes = nestLists(blocks, listNestingMode);
  const render = (options) => {
    fallbackRenderOptions = options;
    return portableTextRender(options);
  };
  const createSlotRenderer = (slotName) => Astro2.slots.render.bind(Astro2.slots, slotName);
  const slots = [
    "type",
    "block",
    "list",
    "listItem",
    "mark",
    "text",
    "hardBreak"
  ].reduce(
    (obj, name) => {
      obj[name] = Astro2.slots.has(name) ? createSlotRenderer(name) : void 0;
      return obj;
    },
    {}
  );
  return renderTemplate`${(() => {
    const renderNode = (slotRenderer) => {
      return ({ Component, props, children }) => slotRenderer?.([{ Component, props, children }]) ?? renderTemplate`${renderComponent($$result, "Component", Component, { ...props }, { "default": ($$result2) => renderTemplate`${children}` })}`;
    };
    return nodes.map(
      render({
        type: renderNode(slots.type),
        block: renderNode(slots.block),
        list: renderNode(slots.list),
        listItem: renderNode(slots.listItem),
        mark: renderNode(slots.mark),
        text: renderNode(slots.text),
        hardBreak: renderNode(slots.hardBreak)
      })
    );
  })()}`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/node_modules/.pnpm/astro-portabletext@0.13.0_astro@6.4.4_@types+node@25.0.2_@vercel+functions@3.6.2_jiti@2_86448f5a9a5f65304f64a185c4243aa1/node_modules/astro-portabletext/components/PortableText.astro", void 0);

const $$Paragraph = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<p class="font-geist-mono text-sm font-light mb-6 leading-7"> ${renderSlot($$result, $$slots["default"])} </p>`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/components/Paragraph.astro", void 0);

const $$AboutUs = createComponent(async ($$result, $$props, $$slots) => {
  const aboutContent = await sanityClient.fetch(ABOUT_QUERY);
  const introBlockImageUrl = urlForImage(aboutContent.introBlock.image);
  const ownerBlockImageUrl = urlForImage(aboutContent.ownerBlock.image);
  const ACCENT_WORDS = 3;
  const words = (aboutContent.ownerBlock.heading ?? "").trim().split(/\s+/);
  const accent = words.slice(0, ACCENT_WORDS).join(" ");
  const tail = words.slice(ACCENT_WORDS).join(" ");
  const components = {
    block: { normal: $$Paragraph }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="w-full max-w-7xl mx-auto px-6 lg:px-10 py-6 pb-16 my-8 bg-gray-900/50 backdrop-blur-2xl fade"> <div class="grid grid-cols-6 gap-y-4 gap-x-10 w-full"> <h1 class="font-oswald font-thinner text-4xl uppercase mb-6 border-b border-brand-white-50 text-brand-white-50 pb-3 col-span-full mt-2 fade"> <span class="font-semibold text-brand-accent-300">${aboutContent.headingAccent}</span> ${aboutContent.headingCopy}</h1> <div class="order-2 col-span-full lg:order-1 lg:col-span-3"> <h2 class="font-geist-mono text-lg font-semibold mb-8 leading-7 fade"> ${aboutContent.introBlock.heading} </h2> ${renderComponent($$result2, "PortableText", $$PortableText, { "value": aboutContent.introBlock.body, "components": components })} </div> <div class="order-1 col-span-full lg:order-2 lg:col-span-3 mb-8 lg:mb-0 fade"> <img class="w-full border border-brand-white-50/30 p-2 aspect-video lg:aspect-square object-cover object-top lg:max-w-none"${addAttribute(introBlockImageUrl.url(), "src")}${addAttribute(aboutContent.introBlock.image.alt, "alt")}> </div> </div> <div class="grid grid-cols-6 gap-y-4 gap-x-10 w-full mt-16"> <div class="col-span-full md:col-span-2 fade"> <img class="w-full object-contain border border-brand-white-50/30 p-2 lg:p-2"${addAttribute(ownerBlockImageUrl.url(), "src")} alt="John Wilson, owner of PFL Pro Sound"${addAttribute(aboutContent.ownerBlock.image.alt, "alt")}> </div> <div class="col-span-full md:col-span-4 md:max-w-2xl fade"> <h3 class="font-geist-mono text-lg font-normal mb-8 leading-7"> <span class="font-bold text-brand-accent-200">${accent}</span>${tail && ` ${tail}`} </h3> ${renderComponent($$result2, "PortableText", $$PortableText, { "value": aboutContent.ownerBlock.body, "components": components })} </div> </div> </section> ` })}  ${renderScript($$result, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/pages/about-us.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/pages/about-us.astro", void 0);

const $$file = "/Users/justinburrow/Sites/pfl-pro-sound-site/src/pages/about-us.astro";
const $$url = "/about-us";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$AboutUs,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
