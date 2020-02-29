export type CompFunc =
  | (() => React.ReactNode)
  | (() => Promise<() => React.ReactNode>)
  | (() => Promise<{ default: () => React.ReactNode }>);

export function initComp(func: CompFunc): Promise<React.ReactNode> {
  return Promise.resolve(func()).then((comp: any) => {
    if (!comp) return comp;
    if (comp.default) return comp.default();
    if (typeof comp === 'function') return comp();
    return comp;
  });
}

export function getPositionHoriziontal(
  index: number,
  position: number,
): { left: string } {
  return { left: `${(index - position) * 100}%` };
}

export function getPositionVertical(
  index: number,
  position: number,
): { top: string } {
  return { top: `${(index - position) * 100}%` };
}
