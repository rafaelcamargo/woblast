const useCustomHistoryModule = jest.requireActual('@src/base/hooks/use-custom-history').default;

let isActive = false;
const push = jest.fn();

function useCustomHistoryDouble() {
  return { push };
}

function useCustomHistory() {
  return isActive
    ? useCustomHistoryDouble()
    : useCustomHistoryModule.useCustomHistory();
}

const useCustomHistoryMock = {
  useCustomHistory,
  push,
  activate: () => {
    isActive = true;
  },
  deactivate: () => {
    isActive = false;
  }
};

export default useCustomHistoryMock;
