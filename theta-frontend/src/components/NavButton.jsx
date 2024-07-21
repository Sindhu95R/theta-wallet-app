import React, { useState } from 'react';

function NavButton({ children, onClick, description }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="nav-button-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button onClick={onClick}>{children}</button>
            {isHovered && <div className="description">{description}</div>}
        </div>
    );
}

export default NavButton;