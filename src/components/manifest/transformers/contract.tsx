import React, { useEffect, useMemo, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ITransformerProps } from "../../../shared/constants";
import { randomId } from "../../../shared/utils";

interface IArgs {
    type:string | undefined
    value:string | undefined
}

interface IReturns {
    name:string
    type:string
}

const Contract = ({ setSpec, _ref }:ITransformerProps) => {
    const [ address, setAddress ] = useState<string>()
    const [ chainId, setChainId ] = useState<number>()
    const [ funcName, setFuncName ] = useState<string>()
    const [ args, setArgs ] = useState<Map<string, IArgs>>(new Map<string, IArgs>())
    const [ returns, setReturns ] = useState<Map<string, IReturns>>(new Map<string, IReturns>())
    const element = (
        <div key={_ref} className="section">
            <Form.Group className="mb-3" controlId="contractAddress">
                <Form.Label>Contract Address</Form.Label>
                <Form.Control type="contract" placeholder="Enter Contract Address" onChange={(e) => setAddress(e.target.value)} />
                <Form.Text className="text-muted">
                Address of the contract to call
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Chain ID</Form.Label>
                <Form.Control type="contract" placeholder="Enter Chain Id" onChange={(e) => setChainId(parseInt(e.target.value))} />
                <Form.Text className="text-muted">
                Chain ID of the network the contract is deployed at
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Function Name</Form.Label>
                <Form.Control type="contract" placeholder="Enter Function Name" onChange={(e) => setFuncName(e.target.value)} />
                <Form.Text className="text-muted">
                Name of the function of the contract to call
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Arguments</Form.Label>
                <Button onClick={() => {const x = args; x.set(randomId(), {type: undefined, value: undefined}); setArgs(x)}}>Add</Button>
                
                
                <div>
                    {args.size}
                    {[...args.keys()].map((v) => <Argument id={v} setArg={() => {}} />) }
                </div>
            </Form.Group>
        </div>
    )

    const spec = useMemo(() =>{ 
      
        setSpec(_ref, {
        group: "core",
        version: "v1alpha",
        kind: "contract",
        spec: {
            address: address,
            chainId: chainId,
            function: funcName,
            args: args,
            returns: returns
        }})
    }
    , [address, chainId, ...args, ...returns])
    
    return element
}

interface IArgElem {
    id:string,
    setArg:(id:string, arg:IArgs) => void
}

const Argument = ({ id, setArg}:IArgElem) => {
    const [ typ, setTyp ] = useState<string>()
    const [ value, setValue ] = useState<string>()

    useEffect(() => {
        if (!typ || !value) {
            return
        }
        setArg(id, {type: typ!, value: value!})
    
    }, [typ, value])
    
    return (
        <div className="section">
        <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control type="contract" placeholder="Enter Argument Type" onChange={(e) => setTyp(e.target.value)} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Value</Form.Label>
            <Form.Control type="contract" placeholder="Enter Argument Value" onChange={(e) => setValue(e.target.value)} />
        </Form.Group>
        </div>
    )
}

export default Contract;