
const toHaveDisabledElement = (component, selector) => {
  const element = component.find(selector)
  const pass = element.attributes().disabled === 'disabled'
  
  if(pass) {
    return {
      message: () =>
        `expected Component \`${component.name()}\` child \`${element.name()}\` not to have the \`disabled\` HTML attribute.\n\
        Element HTML:\n\
        ${element.html()}\n
        Component HTML:\n\
        ${component.html()}\n`,
        pass: true,
    }
  } else {
    return {
      message: () => 
      `expected Component \`${component.name()}\` child \`${element.name()}\` to have the \`disabled\` HTML attribute.\n\
      Element HTML:\n\
      ${element.html()}\n
      Component HTML:\n\
      ${component.html()}\n`,
      pass: false
    }
  }
}

expect.extend({toHaveDisabledElement});