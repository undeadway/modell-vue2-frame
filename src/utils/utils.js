export const initStyles = (styles) => {
    const style = Object.assign({}, styles);

    const arr = [];
    for (const key in style) {
        arr.push(`${key}: ${style[key]};`);
    }

    const output = arr.join(" ");
    return output;
}

export default {
    initStyles
}
