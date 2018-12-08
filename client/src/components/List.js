import React, { Component } from 'react';
import { getList, addToList, deleteItem, updateItem } from '../ListFunctions'
import SubmitForm from './SubmitForm';
import Todo from './Todo';

export default class List extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            term: "",
            editDisabled: false,
            items: [],
        }
    }

    componentDidMount() {
        this.getAll();
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({ term: e.target.value, editDisabled: false });
    }

    getAll = () => {
        getList().then(data => {
            this.setState({
                term: "",
                items: [...data]
            },
            () => {
                console.log(this.state, 'items received!');
            });
        });
    };

    onSubmit = e => {
        e.preventDefault();
        addToList(this.state.term).then(() => {
            this.getAll();
        });
    };

    onUpdate = e => {
        e.preventDefault();
        updateItem(this.state.term, this.state.id).then(() => {
            this.getAll();
        });
    };

    onEdit = (itemId, item) => {
        this.setState({
            id: itemId,
            term: item,
        });
    };

    onDelete = (val) => {
        deleteItem(val);

        const data = [...this.state.items];
        // data.filter(function(item, index) {
        //     if (item[1] === val) {
        //         data.splice(index, 1);
        //         // return item;
        //     }
        // });
        const newData = data.filter((item) => item[1] !== val)
        this.setState({ items: [...newData] });
    };

    render() {
        const { onChange, onSubmit, onUpdate, onEdit, onDelete } = this;
        const { term, editDisabled, items } = this.state;
        return (
            <div className="col-md-12">
                <SubmitForm term={term} onSubmit={onSubmit} onChange={onChange} onUpdate={onUpdate} />
                <table className="table">
                    <tbody>
                        {items.map((item) =>(
                            <Todo key={item[1]}
                                  item={item}
                                  editDisabled={editDisabled}
                                  onEdit={() => onEdit(item[1], item[0])}
                                  onDelete={() => onDelete(item[1])}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}