'use client'

import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'

export default function SkillsInput({   onChange = () => {}, skill }) {
  const [text, setText] = useState('')
  const [skills, setSkills] = useState(Array.isArray(skill) ? skill : [])

  console.log('skills',skill)
 
  useEffect(() => {
    setSkills(Array.isArray(skill) ? skill : [])
  }, [skill])

  const addSkill = () => {
    const trimmed = (text || '').trim()
    if (!trimmed) return
    if (skills.includes(trimmed)) {
      setText('')
      return
    }
    const next = [...skills, trimmed]
    setSkills(next)
    onChange(next)
    setText('')
  }

  const removeSkill = (idx) => {
    const next = skills.filter((_, i) => i !== idx)
    setSkills(next)
    onChange(next)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div>
      <div className="flex gap-2 items-center">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type a skill and press Add"
          className="rounded-md border-[#E6E6E6]"
          style={{ borderWidth: 1 }}
          size="large"
        />
        <Button
          type="primary"
          onClick={addSkill}
          icon={<PlusOutlined />}
          className="!bg-[#144A6C] !border-[#144A6C] !h-9.5"
        >
          Add
        </Button>
      </div>

      {/* Skills list */}
      <div className="mt-3 flex flex-wrap gap-3">
        {skills.map((s, idx) => (
          <div
            key={s + idx}
            className="relative bg-white border border-[#E6E6E6] rounded-md px-3 py-2 min-w-[120px] max-w-[250px]"
          >
            {/* close button at top-right */}
            <button
              onClick={() => removeSkill(idx)}
              aria-label={`Remove ${s}`}
              className="cursor-pointer absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-[#E6E6E6] grid place-items-center shadow-sm"
            >
              <CloseOutlined style={{ fontSize: 12 }} />
            </button>

            <div className="text-sm text-[#202020] truncate">{s}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
