import React, { useEffect, useState } from "react";

import { getProposalList } from "./service";

import Loading from "../Loading";
import Page from "../Page";
import ProposalList from "./ProposalList";

export const ProposalListPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [proposals, setProposals] = useState([])

    useEffect(() => {
        setIsLoading(true);
        getProposalList().then(proposals => {
            setProposals(proposals);
            setIsLoading(false);
        });
    }, []);

    return (
        <Page title="Call for Papers">
            {isLoading && <Loading/>}
            <ProposalList
                proposals={proposals}
            />
        </Page>
    );
}

export default ProposalListPage;
