import React, { useState } from 'react';

function Hamburger() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    function handleMobileMenuClick() {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <div>
            <div className="mobile-menu" onClick={handleMobileMenuClick}>
                <div className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className={`mobile-menu-panel ${isMobileMenuOpen ? 'open' : ''}`}>
                {/* ... */}
            </div>
        </div>
    );
};

export default Hamburger;