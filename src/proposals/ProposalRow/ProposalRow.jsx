import React from "react";
import classNames from "classnames";
import "./ProposalRow.css";

const withoutEventDefault = (callback) =>
    event => {
        event.preventDefault();
        callback();
    };

const ProposalRow = ({ proposal, onStatusUpdate }) => {
    const { id, title, speaker, category, status } = proposal;

    return (
        <div data-testid={`proposal-id-${id}`} className={classNames("ProposalRow", `ProposalRow--${status}`)}>
            <div className="ProposalsRow__status_indicator"/>
            <div className="ProposalsRow__title">
                {title}
            </div>
            <div className="ProposalsRow__speaker">
                Speaker: {speaker}
            </div>
            <div className="ProposalsRow__category">
                Category: {category}
            </div>
            <div className="ProposalsRow__status">
                Status: {status}
            </div>
            {status !== 'accepted' && (
                <button
                    className="ProposalsRow__accept_button"
                    onClick={withoutEventDefault(() => onStatusUpdate(id, "accepted"))}
                >
                    Accept
                </button>
            )}
            {status !== 'rejected' && (
                <button
                    className="ProposalsRow__reject_button"
                    onClick={withoutEventDefault(() => onStatusUpdate(id, "rejected"))}
                >
                    Reject
                </button>
            )}
        </div>
    );
};

export default ProposalRow;
