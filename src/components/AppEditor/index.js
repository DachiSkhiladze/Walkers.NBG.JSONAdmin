import React, { useState } from "react";
import AppEditorBlock from "./components/AppEditorBlock";
import { blockContext } from '../AppEditor/config/contexts'
import AppList from "./inputs/AppList";
import AppTable from "../AppTable";
import { useSelector } from "react-redux";

function AppEditor({ scheme, state, onSave }) {
    const block = {
        scheme,
        path: "",
        onSave,
        state: state[scheme.id]
    }

    const [blocks, setBlocks] = useState([])

    function pushBlock(block) {
        setBlocks([...blocks, block])
    }

    function popBlock() {
        const data = [...blocks]
        data.pop()
        setBlocks(data)
    }

    return (
        <blockContext.Provider value={{ pushBlock, popBlock }}>
            <div className="editor">
                {scheme.type === 'list' && !!scheme.table ?
                    <AppTable onAdd={pushBlock} key={scheme.id} {...block} />
                    :
                    <AppEditorBlock key={scheme.id} {...block} />
                }
                {blocks.map(x =>
                    <AppEditorBlock key={x.scheme.id} {...x} onCancel={popBlock} />
                )}
            </div>
        </blockContext.Provider>
    )
}


export default AppEditor;

