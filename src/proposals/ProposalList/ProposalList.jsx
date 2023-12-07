import React, { useEffect, useState } from "react";
import axios from "axios";
import ProposalRow from "../ProposalRow";
import Loading from "../../Loading";

const ProposalList = () => {
    const [proposals, setProposals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        axios.get("/talks")
            .then(response => {
                return axios.get("/callForPapers").then(cfpResponse => {
                    const talks = response.data;
                    const cfpData = cfpResponse.data.byTalkId;
                    return talks.map(talk => ({
                        ...talk,
                        status: cfpData[talk.id]?.status || 'unknown'
                    }));
                });
            })
            .then(combinedData => {
                setProposals(combinedData);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data. Please try again later.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const onProposalStatusUpdate = (id, newStatus) => {
        setProposals(proposals.map(proposal =>
            proposal.id === id ? { ...proposal, status: newStatus } : proposal
        ));

        axios.put(`/callForPapers/${id}`, { status: newStatus })
            .catch(error => {
                console.error(`Error updating status for proposal ${id}:`, error);
            });
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <ul>
            {proposals.map((proposal) => (
                <ProposalRow
                    key={proposal.id}
                    proposal={proposal}
                    onStatusUpdate={onProposalStatusUpdate}
                />
            ))}
        </ul>
    );
};

export default ProposalList;
