import React, { useState } from 'react'

import { Dropdown } from 'primereact/dropdown'

const BasicDemo = () => {
  const [selectedTime, setSelectedTime] = useState('');

  const time = [
    { duration: '01: 00' },
    { duration: '01: 30' },
    { duration: '02: 00' },
    { duration: '02: 30' },
    { duration: '03: 00' },
    { duration: '03: 30' },
    { duration: '04: 00' },
    { duration: '04: 30' },
    { duration: '05: 00' },
    { duration: '05: 30' },
    { duration: '06: 00' },
    { duration: '06: 30' }
]

  return (
    <div className='p-20'>
      <Dropdown 
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.value)}
        options={time} optionLabel="duration" 
        placeholder="Select Time" className="w-full md:w-14rem overflow-hidden rounded-2xl" 
        scrollHeight = "22rem"
        panelClassName="timePanel"
      />
    </div>
  )
}

export default BasicDemo