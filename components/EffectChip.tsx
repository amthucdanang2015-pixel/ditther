import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function EffectChip() {
    return (
        <div className="effect-sliders-group" style={{ opacity: 1 }}>
            <div className="effect-row">
                <div className="effect-slider-row">
                    <span className="slider-label">Size</span>
                    <input type="range" id="effect-size" min="1" max="100" defaultValue="10" style={{ "--fill": "49.494949494949495%", opacity: 1 } as React.CSSProperties} />
                    <span id="effect-size-value">50</span>
                </div>
            </div>
            
            <div id="lattice-controls" style={{ display: 'none', flexDirection: 'column', gap: 'var(--gutter-lg)' }}>
                <div className="custom-dropdown" id="lattice-line-style-dropdown">
                    <button className="custom-dropdown-trigger">
                        <span className="custom-dropdown-label">Line Style</span>
                        <span className="custom-dropdown-value" id="lattice-line-style-value">Solid</span>
                        <ChevronDown size={16} />
                    </button>
                    <div className="custom-dropdown-menu">
                        <button className="custom-dropdown-item active" data-value="solid">Solid</button>
                        <button className="custom-dropdown-item" data-value="dashed">Dashed</button>
                        <button className="custom-dropdown-item" data-value="dotted">Dotted</button>
                        <button className="custom-dropdown-item" data-value="long">Long Dash</button>
                    </div>
                    <select id="lattice-line-style" style={{ display: 'none' }} defaultValue="solid">
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                        <option value="long">Long Dash</option>
                    </select>
                </div>
                
                <div className="custom-dropdown" id="lattice-node-shape-dropdown">
                    <button className="custom-dropdown-trigger">
                        <span className="custom-dropdown-label">Node Shape</span>
                        <span className="custom-dropdown-value" id="lattice-node-shape-value">Circle</span>
                        <ChevronDown size={16} />
                    </button>
                    <div className="custom-dropdown-menu">
                        <button className="custom-dropdown-item active" data-value="circle">Circle</button>
                        <button className="custom-dropdown-item" data-value="diamond">Diamond</button>
                        <button className="custom-dropdown-item" data-value="square">Square</button>
                        <button className="custom-dropdown-item" data-value="cross">Cross</button>
                        <button className="custom-dropdown-item" data-value="none">Lines Only</button>
                    </div>
                    <select id="lattice-node-shape" style={{ display: 'none' }} defaultValue="circle">
                        <option value="circle">Circle</option>
                        <option value="diamond">Diamond</option>
                        <option value="square">Square</option>
                        <option value="cross">Cross</option>
                        <option value="none">Lines Only</option>
                    </select>
                </div>
                
                <div className="effect-slider-row">
                    <span className="slider-label">Line Width</span>
                    <input type="range" id="lattice-line-width" min="1" max="10" defaultValue="2" style={{ "--fill": "11.11111111111111%" } as React.CSSProperties} />
                    <span id="lattice-line-width-value">2</span>
                </div>
                
                <div className="effect-slider-row">
                    <span className="slider-label">Node Size</span>
                    <input type="range" id="lattice-node-size" min="1" max="10" defaultValue="4" style={{ "--fill": "33.33333333333333%" } as React.CSSProperties} />
                    <span id="lattice-node-size-value">4</span>
                </div>
            </div>    
            
            <div className="effect-row" style={{ display: 'flex' }}>
                <div className="effect-slider-row">
                    <span className="slider-label">Fill</span>
                    <input type="range" id="effect-fill" min="0" max="100" defaultValue="50" style={{ "--fill": "100%", opacity: 1 } as React.CSSProperties} />
                    <span id="effect-fill-value">100%</span>
                </div>
            </div>
            
            <div className="effect-row">
                <div className="effect-slider-row">
                    <span className="slider-label">Density</span>
                    <input type="range" id="effect-density" min="1" max="10" defaultValue="5" step="1" style={{ "--fill": "0%", opacity: 1 } as React.CSSProperties} />
                    <span id="effect-density-value">1</span>
                </div>
            </div>
            
            <div className="effect-row">
                <div className="effect-slider-row">
                    <span className="slider-label">Exposure</span>
                    <input type="range" id="effect-exposure" min="0" max="200" defaultValue="100" style={{ "--fill": "55.00000000000001%", opacity: 1 } as React.CSSProperties} />
                    <span id="effect-exposure-value">110%</span>
                </div>
            </div>
            
            <div className="effect-row" id="scatter-row" style={{ display: 'flex' }}>
                <div className="effect-slider-row">
                    <span className="slider-label">Scatter</span>
                    <input type="range" id="effect-scatter" min="0" max="100" defaultValue="0" style={{ "--fill": "0%", opacity: 1 } as React.CSSProperties} />
                    <span id="effect-scatter-value">0%</span>
                </div>
            </div>
            
            <div className="effect-row">
                <div className="effect-slider-row">
                    <span className="slider-label">Opacity</span>
                    <input type="range" id="effect-layer-opacity" min="0" max="100" defaultValue="100" style={{ "--fill": "100%", opacity: 1 } as React.CSSProperties} />
                    <span id="effect-layer-opacity-value">100%</span>
                </div>
            </div>
            
            <div className="custom-dropdown" id="blend-dropdown">
                <button className="custom-dropdown-trigger" id="blend-dropdown-trigger">
                    <span className="custom-dropdown-label">Blending Mode</span>
                    <span className="custom-dropdown-value" id="blend-dropdown-value">Normal</span>
                    <ChevronDown size={16} />
                </button>
                <div className="custom-dropdown-menu" id="blend-dropdown-menu">
                    <button className="custom-dropdown-item active" data-value="source-over">Normal</button>
                    <button className="custom-dropdown-item" data-value="screen">Screen</button>
                    <button className="custom-dropdown-item" data-value="overlay">Overlay</button>
                    <button className="custom-dropdown-item" data-value="color-dodge">Color Dodge</button>
                    <button className="custom-dropdown-item" data-value="multiply">Multiply</button>
                </div>
                <select id="effect-blend" style={{ display: 'none', opacity: 1 }} defaultValue="source-over">
                    <option value="source-over">Normal</option>
                    <option value="screen">Screen</option>
                    <option value="overlay">Overlay</option>
                    <option value="color-dodge">Color Dodge</option>
                    <option value="multiply">Multiply</option>
                </select>
            </div>
        </div>
    );
}