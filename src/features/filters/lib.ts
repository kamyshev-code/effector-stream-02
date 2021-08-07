import { createApi, createDomain, forward } from 'effector';
import { Result } from '../results';

function not(v: boolean) {
  return !v;
}

interface FilterParams {
  isFit(result: Result): boolean;
}

function createFilter(filterName: string, { isFit }: FilterParams) {
  const filterDomain = createDomain(filterName);

  const $active = filterDomain.createStore(false);
  const $disabled = filterDomain.createStore(false);

  const { activate, deactivate } = createApi($active, {
    activate: (_1, _2: { ctx: string }) => true,
    deactivate: () => false,
  });

  const { enable, disable } = createApi($disabled, {
    enable: () => false,
    disable: () => true,
  });

  forward({ from: disable, to: deactivate });

  function applyFilter(isActive: boolean, results: Result[]) {
    if (!isActive) {
      return results;
    }

    return results.filter((result) => isFit(result));
  }

  return {
    $active,
    $disabled,
    activate,
    deactivate,
    enable,
    disable,
    apply: applyFilter,
  };
}

type Filter = ReturnType<typeof createFilter>;

export { createFilter, Filter, not };
