import Layout from './components/layout/Layout';
import { AnswersContextProvider } from './store/AnswersContext';
import { QuestionsContextProvider } from './store/QuestionsContext';

const App = () => {
  return (
    <QuestionsContextProvider>
      <AnswersContextProvider>
        <Layout />
      </AnswersContextProvider>
    </QuestionsContextProvider>
  );
};

export default App;
