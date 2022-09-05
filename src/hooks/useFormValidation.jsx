import React, {useState, useEffect, useCallback} from "react";

const useFormValidation = (theFirstInput, theSecondInput) => {
  const [isTheFirstValid, setIsTheFirstValid] = useState(false);
  const [isTheSecondValid, setIsTheSecondValid] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(false);

  const handleTheFirstInputChange = useCallback(() => {
    if(theFirstInput.current.validity.valid) {
      setIsTheFirstValid(true);
    }
    else {
      setIsTheFirstValid(false);
    }
  }, [])

  const handleTheSecondInputChange = useCallback(() => {
    if(theSecondInput.current.validity.valid) {
      setIsTheSecondValid(true);
    }
    else {
      setIsTheSecondValid(false);
    }
  }, [])

  const resetValid = () => {
    setIsTheFirstValid(false);
    setIsTheSecondValid(false);
  }

  const activeValid = () => {
    setIsTheFirstValid(true);
    setIsTheSecondValid(true);
  }

  useEffect(() => {
    setIsButtonValid(isTheFirstValid && isTheSecondValid);
  }, [isTheFirstValid, isTheSecondValid])
  
  return {isButtonValid, isTheFirstValid, handleTheFirstInputChange, handleTheSecondInputChange, resetValid, activeValid};
}

export default useFormValidation;