import '@testing-library/jest-dom';
import useCustomHistoryMock from '@src/base/mocks/useCustomHistory';

jest.mock('@src/base/hooks/use-custom-history', () => useCustomHistoryMock);
