import React from 'react';
import ReactLoading from "react-loading";

const BarsLoading = () => {
    return (
        <>
            <div style={{ position: 'absolute', top: '45%', left: '45%' }}>
                <ReactLoading type={'bars'} color="#0E364C" />
            </div>
        </>
    );
}

export default BarsLoading;