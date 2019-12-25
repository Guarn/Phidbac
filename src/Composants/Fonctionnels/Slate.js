import React, { useCallback, useMemo } from "react";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";

import "./Slate.css";

const SlateJs = (props) => {
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(() => withReact(createEditor()), []);

    return (
        <Slate editor={editor} value={props.value} selection={null}>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                readOnly={true}
                style={{ userSelect: "text" }}
            />
        </Slate>
    );
};

const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case "citation":
            return (
                <div
                    style={{
                        textAlign: element.align,
                        marginLeft: element.marginLeft,
                        marginTop: "0px",
                        marginBottom: "0px",
                        display: "flex"
                    }}
                    {...attributes}
                >
                    <div
                        style={{
                            backgroundColor: "rgba(0,0,0,0.2)",
                            width: "6px",
                            marginRight: "30px"
                        }}
                    />
                    {children}
                </div>
            );
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "h1":
            return (
                <h1
                    style={{
                        textAlign: element.align,
                        marginLeft: element.marginLeft,
                        marginTop: "0px",
                        marginBottom: "0px"
                    }}
                    {...attributes}
                >
                    {children}
                </h1>
            );
        case "h2":
            return (
                <h2
                    style={{
                        textAlign: element.align,
                        marginLeft: element.marginLeft,
                        marginTop: "0px",
                        marginBottom: "0px"
                    }}
                    {...attributes}
                >
                    {children}
                </h2>
            );
        case "h3":
            return (
                <h3
                    style={{
                        textAlign: element.align,
                        marginLeft: element.marginLeft,
                        marginTop: "0px",
                        marginBottom: "0px"
                    }}
                    {...attributes}
                >
                    {children}
                </h3>
            );
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        case "link":
            return (
                <a
                    {...attributes}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                        element.url.charAt(0) === "h"
                            ? element.url
                            : "http://" + element.url
                    }
                >
                    {children}
                </a>
            );
        default:
            return (
                <p
                    style={{
                        textAlign: element.align,
                        marginLeft: element.marginLeft,
                        marginTop: "0px",
                        marginBottom: "0px"
                    }}
                    {...attributes}
                >
                    {children}
                </p>
            );
    }
};

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underlined) {
        children = <u>{children}</u>;
    }

    return (
        <span
            style={{
                color: leaf.couleurTexteActive ? leaf.couleurTexte : null,
                backgroundColor: leaf.couleurBackgroundActive
                    ? leaf.couleurBackground
                    : null,
                textAlign: leaf.alignement ? leaf.align : null
            }}
            {...attributes}
        >
            {children}
        </span>
    );
};

export default SlateJs;
