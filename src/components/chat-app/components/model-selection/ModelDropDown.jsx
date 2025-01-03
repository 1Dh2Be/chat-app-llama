import "./ModelDropDown.css"
import { useRef, useState, useEffect } from "react"
import { RiArrowDropDownLine } from "react-icons/ri";
import { useModel } from "../../context/ModelContext";
import { FaCheckCircle } from "react-icons/fa";




const ModelDropDown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {selectedModel, setSelectModel} = useModel();
    const dropdownRef  = useRef(null)

    const models = {
      "Nexus": "Qwen2-72B-Instruct",
      "Nexus Pro": "llama3.1-405b"
    };

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

    const handleModelSelect = (modelkey) => {
      setSelectModel({[modelkey]: models[modelkey]})
      setIsOpen(!isOpen)
    }

    const getCurrentModelKey = () => {
      return Object.keys(selectedModel)
    }

    return (
        <div className="dropdown-container" ref={dropdownRef}>
          <div
            className="left-section"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h1>{getCurrentModelKey()}</h1>
            <RiArrowDropDownLine className="icon" size="25px"/>
          </div>

          {isOpen && (
            <div className="dropdown-menu">
              {Object.keys(models).map((modelKey) => (
                <div key={modelKey} className="dropdown-item" onClick={() => {handleModelSelect(modelKey)}}>
                  {modelKey}
                  {modelKey === getCurrentModelKey()[0] && (
                    <FaCheckCircle className="selected-icon" size="14px"/>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
}

export default ModelDropDown