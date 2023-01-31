
import React, { useState } from 'react';
import { Button, Container, Dropdown, Form, Row } from "react-bootstrap";
import IPFS from './transformers/ipfs';
import Contract from './transformers/contract';
import { randomId } from '../../shared/utils';


const NewManifest = () => {
    const [ selected, setSelected]  = useState(-1)
    const [transformerE, setTransformers] = useState<any[]>([])
    const [specs, setSpecs] = useState<Map<string, any>>(new Map<string, any>())

    const transformers = [
       IPFS,
       Contract,
    ]

    const handleChange = (key:string, spec:any) => {
        const x = specs
        x.set(key, spec)
        setSpecs(x)
    }

    const addTransformer = (e:any) => {
        const Xxx = transformers[e.target.value]
        setTransformers([...transformerE, React.createElement(Xxx, {setSpec: handleChange, _ref: randomId()})])
    }
    
    return (
        <Container>

            <Form>
                <Form.Group className="mb-3" controlId="contract">
                    <Form.Label>Contract Address</Form.Label>
                    <Form.Control type="contract" placeholder="Enter contract address" />
                    <Form.Text className="text-muted">
                    Address of your NFT smart contract
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Blockchain Network</Form.Label>
                    <Form.Select>
                        <option>Polygon Mumbai (80001)</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label>Transformers</Form.Label>
                    <Form.Select onChange={addTransformer} value={selected}>
                        <option value={-1}>Add Transformer</option>
                        {transformers.map((t, i) => {return <option value={i}>{t.name}</option>})}
                    </Form.Select>
        
                </Form.Group>
                <Container>
                    <Form.Group>
                        {transformerE.map((t) => t)}
                    </Form.Group>
                </Container>


                <Button variant="primary" type="submit">
                    Submit
                </Button>

                <Button onClick={() => console.log(specs)}>Get SPec</Button>
            </Form>
        </Container>
    )
}

export default NewManifest;