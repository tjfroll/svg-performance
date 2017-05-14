let { Variable,
  Canvas,
  Input,
  Button,
  not,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  Div,
  P,
  A,
  Span,
  Strong,
  TFoot,
  H1,
  H2,
  Textarea
} = alkali

const append = (target, elements) => {
  if (target == null || elements == null)
    return
  if (_.isArray(elements)) {
    for (const element of elements) {
      target.append(element)
    }
  } else {
    target.append(elements)
  }
  return elements
}

const empty = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

const seconds = (secs) => secs * 1000

const after = (secs, action) => {
  window.setTimeout(action, seconds(secs))
}