import React, { useState, useEffect } from "react";

export default function NewElseForm ({ addElse, elseList }) {
    
    const [newElse, setNewElse] = useState({
      elseEvent: "",
      elseProductivity: 0,
      elseChecked: false
    });
    
    let filted = []
    // when newElse.elseEvent, elseProductivity is triggered update filted
    // const [filted, setFilted] = useState([])
    // useEffect(() => {
      //   productivityFilter()
      //   filted = { ...filted, elseEvent: eventFilter(newElse.elseEvent)}
      // }, [])
      
    const toFilted = async () => {
      eventFilter(newElse.elseEvent)
      productivityFilter(newElse.elseProductivity)
    }
    
    const getNewElseEvent = e => setNewElse({ ...newElse, elseEvent: e.target.value.trim()})
    const getNewElseProductivity = e => setNewElse({ ...newElse, elseProductivity: Number(e.target.value) })
    const getCheckbox = e => setNewElse({ ...newElse, elseChecked: !newElse.elseChecked})
    

    const eventFilter = (eventTitle) => {
      return new Promise(resolve => {
        elseList
          .filter(event => event.elseEvent === eventTitle ? 
            alert(`'${eventTitle}' is already exist!`) :
            eventTitle === "" ?
              filted = { ... filted, elseEvent: "Nothing" } :
              filted = { ... filted, elseEvent: eventTitle },
              )
        console.log(filted)
        resolve()
        })
    }

    function productivityFilter(percentageInput) {
      const total = elseList
        .map(event => event.elseProductivity)
        .reduce((total, number) => 
          total + number
        , 0) 
      return new Promise(resolve => {
        percentageInput === 0 ?
          alert(`Percentage is 0`) :
          total + percentageInput > 100 ?
            alert(`You can't add more than ${100 - total}%`) :
            filted = { ...filted, elseProductivity: percentageInput }
        resolve()
      })
    }

    function submitHandler(e) {
      e.preventDefault()
      productivityFilter(newElse.elseProductivity)
        .then(eventFilter(newElse.elseEvent))
      if (filted.elseProductivity) {
      addElse(filted)
      setNewElse({ elseEvent: "", elseProductivity: 0, elseChecked: false})
      }
    }

    return (
      <form 
        className="add-else-warpper" 
        onSubmit={submitHandler}
      >
        <div className="review-input-wrapper">
          {/* get {title} from daily plan */}
          <input
            className="review_input"
            type="text"
            onChange={getNewElseEvent}
            value={newElse.elseEvent}
          />
          <select
            className="percentages"
            onChange={getNewElseProductivity}
            value={newElse.elseProductivity}
          >
            <option value="100">100%</option>
            <option value="90">90%</option>
            <option value="80">80%</option>
            <option value="70">70%</option>
            <option value="60">60%</option>
            <option value="50">50%</option>
            <option value="40">40%</option>
            <option value="30">30%</option>
            <option value="20">20%</option>
            <option value="10">10%</option>
            <option value="0">0%</option>
          </select>
        </div>
        <div className="review-input-wrapper">
          <span style={{ flex: 1 }}>related to</span>
          <select id="review_related_select">
            <option>None</option>
            <option>None</option>
          </select>
        </div>
        <div className="review-input-wrapper">
          <label className="switch">
            <input type="checkbox" 
            onChange={getCheckbox} 
            value={newElse.elseChecked}/>
            <span className="switch-slider"></span>
          </label>
          <button 
            className="review_button" 
            type="submit" >
              Add
          </button>
        </div>
      </form>
    );
  }