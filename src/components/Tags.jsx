import { useState, useEffect } from 'react'

export default function Tags({ tagsUpdated, count }) {
  const tagChoices = ['node', 'javascript', 'react', 'jamstack']
  const [selectedTags, setSelectedTags] = useState([])

  const tagChange = e => {
    const value = e.target.value
    const alreadySelected = selectedTags.includes(value)
    if (e.target.checked && !alreadySelected) {
      setSelectedTags(p => [...p, value])
    } else if (!e.target.checked && alreadySelected) {
      setSelectedTags(p => p.filter(prevTag => prevTag !== value))
    }
  }

  // reset selected tags onsubmit
  useEffect(() => {
    setSelectedTags([])
  }, [count])

  useEffect(() => {
    tagsUpdated(selectedTags)
  }, [selectedTags, tagsUpdated])

  return (
    <>
      {tagChoices.map((choice, index) => (
        <label className="checkbox-inline mr-3" key={index}>
          <input type="checkbox" value={choice} onChange={tagChange} />
          {' ' + choice}
        </label>
      ))}
    </>
  )
}
