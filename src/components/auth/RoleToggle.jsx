// components/ui/RoleToggleMUI.jsx
'use client';

import { initiateRole } from '@/redux/auth/userSlice';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Padding } from 'node_modules/@mui/icons-material/index';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function RoleToggleMUI({ value , onChange, role1, role2 }) {
  const dispatch = useDispatch();

  

  const handle = useCallback((e, next) => {
    
  //  console.log(next)

    if (!next) return;
    onChange?.(next);

    const payload = next;
    dispatch(initiateRole(payload));
     

  }, [onChange]);

  return (
    <div className="inline-block w-full ">
      {/* Track */}
      <div className="relative w-full h-10 bg-gray-200 rounded-md mx-auto">
        {/* Group overlays the track */}
        <ToggleButtonGroup
          exclusive
          value={value}
          onChange={handle}
          className="absolute inset-0 grid grid-cols-2"
          sx={{
  '& .MuiToggleButtonGroup-grouped': {
    margin: 0,
    border: '0 !important',
    
    flex: 1,
  },
  '& .MuiToggleButton-root': {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.9375rem',
    lineHeight: 1,
    background: 'transparent',
    color: '#6B7280',
    outline: 'none',
    padding: '8px 12px',        
  },
  '& .MuiToggleButton-root.Mui-selected': {
    background: '#FFFFFF !important',
    color: '#111827',
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
    border: '1px solid #E5E7EB',
    margin: '4px',              
    borderRadius: 1,            
  },
  '& .MuiToggleButton-root:hover': {
    background: 'transparent',
  },
  '& .MuiToggleButton-root.Mui-selected:hover': {
    background: '#FFFFFF',
  },
  '& .MuiToggleButton-root.Mui-focusVisible': {
    boxShadow: 'none',
    outline: 'none',
  },
}}
        >
          <ToggleButton value={role1} disableRipple className="rounded-full">
            {role1}
          </ToggleButton>
          <ToggleButton value={role2} disableRipple className="rounded-full">
           {role2}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
