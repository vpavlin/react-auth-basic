import React, { useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import { ITransformerProps } from "../../../shared/constants"


const IPFS = ({ setSpec, _ref }:ITransformerProps) => {
    const [ url, setURL ] = useState()

    const change = (e:any) => {
        setURL(e.target.value)
    }

    const name = "IPFS"
    const element = (
        <div key={_ref} className="section">
            <Form.Group className="mb-3" controlId="ipfs">
                <Form.Label>IPFS Url</Form.Label>
                <Form.Control type="contract" placeholder="Enter IPFS url" onChange={change} />
                <Form.Text className="text-muted">
                URL for your base NFT metadata
                </Form.Text>
            </Form.Group>
        </div>
    )

    const spec = useMemo(() =>{       
        setSpec(_ref, {
        group: "core",
        version: "v1alpha",
        kind: "ipfs",
        spec: {
            url: url,
        }})
    }
    , [url])
    



    return element
}

export default IPFS;