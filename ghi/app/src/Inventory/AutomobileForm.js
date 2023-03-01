import { useEffect, useState } from "react";

const AutomobileForm = () => {

  const initialData = {
    color: '',
    year: '',
    vin: '',
    model_id: ''
  }


  const [autoData, setAutoData] = useState(initialData);
  const [models, setModels] = useState([]);

  const getModels = async () => {
    const modelUrl = 'http://localhost:8100/api/models/';
    const response = await fetch(modelUrl);
    if (response.ok) {
      const modelsData = await response.json();
      setModels(modelsData.models);
    }
  }

  useEffect(() => {
    getModels();
  }, [])

  const handleFormChange = (e) => {
    setAutoData({
      ...autoData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const autoUrl = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify({ ...autoData }),
      headers: { "Content-Type": "application/json" },
    }
    const response = await fetch(autoUrl, fetchConfig);
    if (response.ok) {
      const newAuto = await response.json()
      setAutoData(initialData);
    }
  }

  return (
    <div className="service-form-container">
    <div className="people-page-background">
        <img
            className="people-page-image"
            src="https://wallpaperaccess.com/full/878797.jpg"
            alt="sale image"
            />
    </div>
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add an automobile to inventory</h1>
          <form onSubmit={handleSubmit} id="create-automobile-form">

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={autoData.color} placeholder="color" required type="text" name="color" id="color" className="form-control" />
              <label htmlFor="color">Color</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={autoData.year} placeholder="year" required type="number" name="year" id="year" className="form-control" />
              <label htmlFor="year">Year</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={autoData.vin} placeholder="vin" required type="text" name="vin" id="vin" className="form-control" />
              <label htmlFor="vin">VIN</label>
            </div>

            <div className="mb-3">
              <select onChange={handleFormChange} value={autoData.model} required name="model_id" id="model_id" className="form-select">
                <option value="">Choose a model</option>
                {models.map(model => {
                  return (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button className="btn btn-dark">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AutomobileForm;
