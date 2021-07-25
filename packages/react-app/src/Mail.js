import React, { useState, useEffect } from 'react'
import Web3 from 'web3';
import { addresses, abis } from "@project/contracts";
import { Button, Form, Header, Icon, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


const { ethers } = require("ethers");

function Mail() {
    // store dai in local state
    const [mail, setMail] = useState();
    const [to_address, setToAddress] = useState();
    const [loading, setLoading] = useState(false);
    const [mailId, setMailId] = useState(0);
    const [sender, setSenderAddress] = useState();

    const [web3, setWeb3] = useState();
    const [infuraProvider, setInfuraProvider] = useState();

    const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(addresses.safeMail);
    console.log(abis.safeMail);
    const signer = etherProvider.getSigner();
    const mailContract = new ethers.Contract(addresses.safeMail, abis.safeMail, signer);
    
    useEffect(() => {
        async function fetchData() {
            // Runs after the first render() lifecycle
            var web3 = window.web3;
            if (typeof web3 !== 'undefined') {
                web3 = new Web3(web3.currentProvider);
                let address = (await web3.eth.getAccounts())[0]
                console.log('address:', address);
                // setAddress(address);
                setWeb3(web3);

                setInfuraProvider(new ethers.providers.InfuraProvider(
                    process.env.REACT_APP_ETHEREUM_NETWORK,
                    process.env.REACT_APP_INFURA_PROJECT_ID
                ));
            }
        }
        fetchData()
    } , []);


    // call the sendMail function in Mail smart contract
    async function Send() {
        setLoading(true);

        console.log(to_address);
        console.log(mail);
        const txn = await mailContract.sendMail(to_address, mail);
        await txn.wait();

        alert("mail sent");

        setLoading(false);
    }

    async function report() {
        setLoading(true);

        const txn = await mailContract.reportSpam(0, mailId, sender);
        await txn.wait();

        alert("Sent to Kleros Court");

        setLoading(false);
    }
    
    return (
        <div className="App">
            <Form loading={loading}>
                <Form.Field>
                    <input onChange={e => setToAddress(e.target.value)} placeholder="Enter receiver" /><br />
                </Form.Field>
                <Form.Field>
                    <input onChange={e => setMail(e.target.value)} placeholder="Enter mail" /><br />
                </Form.Field>
                <Form.Field>
                    <Button onClick={Send}>Send 🏁</Button><br />
                </Form.Field>
                <Form.Field>
                    <input onChange={e => setMailId(e.target.value)} placeholder="Enter MailId" /><br />
                </Form.Field>
                <Form.Field>
                    <input onChange={e => setSenderAddress(e.target.value)} placeholder="Who sent the mail?" /><br />
                </Form.Field>
                <Form.Field>
                    <Button onClick={report}>Report 👩‍⚖️</Button><br />
                </Form.Field>
            </Form>
        </div>
    );
}

export default Mail;