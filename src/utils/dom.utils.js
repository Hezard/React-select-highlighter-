export function isSelectionBackward(selection) {
  const position = selection.anchorNode.compareDocumentPosition(selection.focusNode);

  return (
    (!position && selection.anchorOffset > selection.focusOffset) ||
    position === Node.DOCUMENT_POSITION_PRECEDING
  );
}

export function findSelectionIndex(nodes, { anchorNode, focusNode }) {
  let currentIndex = 0;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const firstChild = node.firstChild;
    const sibling = node.nextSibling;

    if (
      (firstChild && firstChild === anchorNode) ||
      node === anchorNode ||
      (firstChild && firstChild === focusNode) ||
      node === focusNode
    ) {
      break;
    }

    currentIndex += (firstChild && firstChild.length) || node.length;

    if (
      sibling === anchorNode ||
      sibling === focusNode ||
      (sibling && sibling.firstChild === anchorNode) ||
      (sibling && sibling.firstChild === focusNode)
    ) {
      break;
    }
  }
  return currentIndex;
}
