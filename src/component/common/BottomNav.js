import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { Link, useLocation } from 'react-router-dom';


const BottomNav = () => {
    let location = useLocation();

    return (
        <div className='bottom-navigation-container color-white'>
            <div className='main-bottom-nav'>
                <div className='flex justify-content-space-between p-2 pl-4 pr-4'>
                    <Link to="/dashboard">
                        <div className={`nav-items ${location.pathname === "/dashboard" ? 'active' : ""}`}>
                            <HomeIcon />
                        </div>
                    </Link>
                    <Link to="/stats">
                        <div className={`nav-items ${location.pathname === "/stats" ? 'active' : ""}`}>
                            <StackedBarChartIcon />
                        </div>
                    </Link>
                    <div className='nav-items nav-scanner'>
                        <DocumentScannerIcon fontSize='small' />
                    </div>
                    <Link to="/trending">
                        <div className={`nav-items ${location.pathname === "/trending" ? 'active' : ""}`}>
                            <TrendingUpIcon />
                        </div>
                    </Link>
                    <Link to="/setting">
                        <div className={`nav-items ${location.pathname === "/setting" ? 'active' : ""}`}>
                            <SettingsIcon />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BottomNav