import addError from "./add-error";

function debounce(fun, ms) {
  let isCooldown = false;
  return function () {
    if (isCooldown) return;
    isCooldown = true;
    fun.apply(this, arguments);
    setTimeout(() => (isCooldown = false), ms);
  };
}
const animationMessage = debounce(addError, 5000);

export default function checkError(input) {
  // Props input
  const { type, value, name, placeholder, required } = input;
  // Props option
  const _name = placeholder || placeholder !== "" ? placeholder : name;
  const _value = value.trim();
  const _length = _value.length;
  const _type = (val) => type === val;
  const testValue = _value !== "" || required;

  function errorСheckingСondition(condition, message) {
    if (condition) {
      animationMessage(input, `Поле «${_name}» ${message}`, 5000);
      return true;
    }
    return false;
  }

  return [
    errorСheckingСondition(_length < 1 && required, "не указано!"),
    errorСheckingСondition(
      _type("email") &&
        !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
          _value
        ) &&
        testValue,
      "указано не правильно, или имеет некорректную формулировку!"
    ),
  ].includes(true);
}
