import CreateTrainingForm from '../../components/create-training-form/create-training-form';

function CreateTraining(): JSX.Element {
  return (
    <div className="popup-form popup-form--create-training">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Создание тренировки</h1>
          </div>
          <div className="popup-form__form">
            <CreateTrainingForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTraining;
