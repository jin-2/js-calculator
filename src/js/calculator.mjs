const calculator = (function () {
  let alertFn = null;
  let renderTextFn = null;
  let inputList = [];
  let index = 0;

  function validateDigits(prevValueLength, nextValue) {
    if (!prevValueLength && Number(nextValue) === 0) {
      return false;
    }
    if (prevValueLength >= 3) {
      alertFn('숫자는 세 자리까지만 입력 가능합니다!');
      return false;
    }
    return true;
  }

  function validateOperation(lastValue) {
    if (!lastValue || isNaN(Number(lastValue))) {
      alertFn('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
      return false;
    }
    return true;
  }

  function addition(num1, num2) {
    return num1 + num2;
  }

  function subtraction(num1, num2) {
    return num1 - num2;
  }

  function multiplication(num1, num2) {
    return num1 * num2;
  }

  function division(num1, num2) {
    return num1 / num2;
  }

  function setTotal(operation, num1 , num2 ) {
    num1 = num1 || 0;
    num2 = num2 || 0;
    switch (operation) {
      case '+':
        return addition(num1, num2);
      case '-':
        return subtraction(num1, num2);
      case 'X':
        return multiplication(num1, num2);
      case '/':
        return division(num1, num2);
      default:
        return num1;
    }
  }

  function calculate() {
    const operation = inputList[1];
    return setTotal(operation, Number(inputList[0]), Number(inputList[2]));
  }

  return {
    setAlert(fn) {
      alertFn = fn;
    },
    setRenderText(fn) {
      renderTextFn = fn;
    },
    setNumber(str) {
      if (!validateDigits(inputList[index]?.length, str)) {
        return;
      }

      if (inputList[index]) {
        inputList[index] += str;
      } else {
        inputList[index] = str;
      }

      renderTextFn(inputList.join(''));
    },
    setOperation(str) {
      if (str === '=') {
        index = 0;
        const totalNum = Math.floor(calculate());
        inputList = [String(totalNum)];
        renderTextFn(totalNum);
        return;
      }

      if (!validateOperation(inputList.at(-1))) {
        return;
      }

      inputList.push(str);
      index += 2;
      renderTextFn(inputList.join(''));
    },
    clear() {
      index = 0;
      inputList = [];
      renderTextFn('0');
    },
  };
})();

export default calculator;
