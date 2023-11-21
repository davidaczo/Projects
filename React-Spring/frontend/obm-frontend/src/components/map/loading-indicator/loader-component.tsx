import React from 'react';
import './loaderStyle.css';

export const LoaderComponent = () => (
    <div aria-busy="true" aria-label="Loading" className="container" role="progressbar">
        <div className="swing">
            <div className="swing-l" />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div className="swing-r" />
        </div>
        <div className="shadow">
            <div className="shadow-l" />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div className="shadow-r" />
        </div>
    </div>
);
