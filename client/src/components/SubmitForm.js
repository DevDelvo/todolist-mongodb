import React from 'react';

const SubmitForm = (props) => {
    const {term, onSubmit, onChange, onUpdate} = props;
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Task Name</label>
                <div className="row">
                    <div className="col-md-9">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            value={term || ""}
                            onChange={onChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <button
                            className="btn btn-primary"
                            onClick={onUpdate}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-success btn-block"
            >
                Submit
            </button>
        </form>
    )
}

export default SubmitForm;
