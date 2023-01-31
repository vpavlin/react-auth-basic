import { applyValue, JsonViewer, JsonViewerOnChange } from "@textea/json-viewer";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Dropdown, Form } from "react-bootstrap";
import { getManifest, listManifests } from "../../shared/api";

const Manifest = () => {
    const [address, setAddress] = useState<string>() 
    const [chainId, setChainId] = useState<number>(80001) 
    const [manifest, setManifest] = useState({})
    const [manifests, setManifests] = useState<any[]>()
    const get = async () => {
        if (!address) { return }
        const data = await getManifest(chainId, address!)
        console.log(data)
        setManifest(data)
    }

    const loadManifest =  async (chainId:number, address:string) => {
        setChainId(chainId)
        setAddress(address)
        getManifest(chainId, address!).then((data) => setManifest(data))
    }
    
    useEffect(() => {
        listManifests().then((res) => setManifests([...res]))
    }, [])
    
    return (
        <>
        <Container>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Manifest
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {
                        manifests?.map((item) => 
                            <Dropdown.Item onClick={() => loadManifest(item.chainId, item.address)}><strong>{item.alias.length > 0 ? item.alias : item.address}</strong> ({item.chainId})</Dropdown.Item>
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Container>
        
        <Container>
            <h2>Showing {address} (ChainID: {chainId})</h2>
            <JsonViewer value={manifest} editable={true} onChange={useCallback<JsonViewerOnChange>(
                (path, oldValue, newValue) => {
                    const newmanifest = applyValue(manifest, path, newValue)
                    setManifest({...newmanifest})
            }, [])}/>
        </Container>
        </>
    )
}

export default Manifest;

/*

<Container className='text-center'>
            <Form.Select onChange={(e) => setChainId(parseInt(e.target.value))}>
                <option value="80001">Polygon Mumbai</option>
            </Form.Select>
            <Form.Control type="text" onChange={(e) => setAddress(e.target.value)}/>
            <Button onClick={get}>Show</Button>
        </Container>

        */