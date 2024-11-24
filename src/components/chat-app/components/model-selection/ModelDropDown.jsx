import "./ModelDropDown.css"
import { useRef, useState, useEffect } from "react"
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useModel } from "./ModelContext";



const ModelDropDown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {selectedModel, setSelectModel} = useModel();
    const dropdownRef  = useRef(null)

    const models = [
        'mistral-7b-instruct',
        'mixtral-8x22b-instruct'
    ]

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsOpen(false)
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    const handleModelSelect = (model) => {
      setSelectModel(model)
      setIsOpen(!isOpen)
    }

    return (
        <div className="dropdown-container" ref={dropdownRef}>
          <div
            className="left-section"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h1>{selectedModel}</h1>
            <RiArrowDropDownLine className="icon" size="25px"/>
          </div>

          {isOpen && (
            <div className="dropdown-menu">
              {models.map((model, index) => (
                <div key={index} className="dropdown-item" onClick={() => {handleModelSelect(model)}}>
                  {model}
                  {model === selectedModel && (
                    <IoCheckmarkCircleOutline className="selected-icon" size="14px"/>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
}

export default ModelDropDown