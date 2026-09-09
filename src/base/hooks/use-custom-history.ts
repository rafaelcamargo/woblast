import { useNavigate } from 'react-router-dom';

type CustomHistory = {
  push: ReturnType<typeof useNavigate>
};

function useCustomHistory(): CustomHistory {
  const navigate = useNavigate();
  return {
    push: navigate
  };
}

export default { useCustomHistory };
