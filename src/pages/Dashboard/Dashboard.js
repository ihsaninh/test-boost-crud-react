import React, { Component, Fragment } from "react";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBarang: [],
      editable: false,
      kode_barang: "",
      nama_barang: "",
      jumlah_barang: "",
      gambar_barang: "",
      harga_barang: "",
    };
  }

  componentDidMount() {
    this.getDataBarang();
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleAddBarang = () => {
    this.setState({ editable: false });
    axios
      .post("http://127.0.0.1:8000/api/v1/barangs", {
        kode_barang: this.state.kode_barang,
        nama_barang: this.state.nama_barang,
        jumlah_barang: this.state.jumlah_barang,
        gambar_barang: this.state.gambar_barang,
        harga_barang: this.state.harga_barang
      })
      .then(res => {
        alert(res.data.message);
        this.getDataBarang();
        this.setState({
          kode_barang: "",
          nama_barang: "",
          jumlah_barang: "",
          gambar_barang: "",
          harga_barang: ""
        });
      })
      .catch(err => {
        alert("gagal menambah data");
      });
  };

  getBarangByKode = kode_barang => {
    this.setState({
      editable: true,
      kode_barang
    });
    axios
      .get(`http://127.0.0.1:8000/api/v1/barangs/${kode_barang}`)
      .then(res => {
        this.setState({
          kode_barang: res.data.barang.kode_barang,
          nama_barang: res.data.barang.nama_barang,
          jumlah_barang: res.data.barang.jumlah_barang,
          gambar_barang: res.data.barang.gambar_barang,
          harga_barang: res.data.barang.harga_barang
        });
      })
      .catch(err => {
        alert("gagal menampilkan data barang");
      });
  };

  getDataBarang = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/barangs")
      .then(res => {
        this.setState({
          edit: true,
          allBarang: res.data.barang
        });
      })
      .catch(err => {
        alert("gagal menampilkan data barang");
      });
  };

  handleDeleteBarang = kode_barang => {
    axios
      .delete(`http://127.0.0.1:8000/api/v1/barangs/${kode_barang}`)
      .then(res => {
        alert(res.data.message);
        this.getDataBarang();
      })
      .catch(err => {
        alert("gagal menghapus data barang");
      });
  };

  handleUpdateBarang = () => {
    axios
      .put(`http://127.0.0.1:8000/api/v1/barangs/${this.state.kode_barang}`, {
        kode_barang: this.state.kode_barang,
        nama_barang: this.state.nama_barang,
        jumlah_barang: this.state.jumlah_barang,
        gambar_barang: this.state.gambar_barang,
        harga_barang: this.state.harga_barang
      })
      .then(res => {
        alert(res.data.message);
        this.getDataBarang();
        this.setState({
          editable: false,
          kode_barang: "",
          nama_barang: "",
          jumlah_barang: "",
          gambar_barang: "",
          harga_barang: ""
        });
      })
      .catch(err => {
        alert("gagal mengubah data barang");
      });
  };

  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand" href="/">
              <b>TOSERBA</b>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ml-auto">
                <a className="nav-item nav-link active" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
                <a className="nav-item nav-link" href="/">
                  Message
                </a>
                <a className="nav-item nav-link" href="/">
                  Profil
                </a>
              </div>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <div className="row">
            <div className="col-sm-3">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Cari barang disini..." />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">Button</button>
              </div>
            </div>
              <ul class="list-group mt-5">
                <li class="list-group-item d-flex justify-content-between align-items-center active">
                  Dashboard
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Message
                  <span class="badge badge-primary badge-pill">42</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Pengaturan
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Komentar
                  <span class="badge badge-primary badge-pill">5</span>
                </li>
              </ul>
            </div>
            <div className="col-sm-9">
               <div className="title mb-5">
            <button
              type="button"
              data-toggle="modal"
              data-target="#addmodal"
              className="btn btn-primary float-right"
            >
              Tambah Data
            </button>
            <h3>Panel Admin</h3>
          </div>
          <table className="table">
            <thead>
              <tr className="bg-primary text-white">
                <th scope="col">Kode Barang</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Jumlah Barang</th>
                <th scope="col">Gambar Barang</th>
                <th scope="col">Harga Barang</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allBarang.map((barang, index) => (
                <tr key={index}>
                  <td>{barang.kode_barang}</td>
                  <td>{barang.nama_barang}</td>
                  <td>{barang.jumlah_barang}</td>
                  <td>{barang.gambar_barang}</td>
                  <td>{barang.harga_barang}</td>
                  <td>
                    <a href="#"
                      className="btn btn-primary mr-1"
                      data-toggle="modal"
                      data-target="#addmodal"
                      onClick={() => this.getBarangByKode(barang.kode_barang)}
                    >
                      Edit
                    </a>
                    <a href="#"
                      className="btn btn-danger"
                      onClick={() => this.handleDeleteBarang(barang.kode_barang)}
                    >
                      Hapus
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="modal fade"
          id="addmodal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="addModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {this.state.editable === true
                    ? "Edit Data Barang"
                    : "Tambah Data Barang"}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="kode_barang">Kode Barang</label>
                  <input
                    type="text"
                    className="form-control"
                    id="kode_barang"
                    placeholder="Kode Barang"
                    onChange={this.handleChange}
                    value={this.state.kode_barang}
                    readOnly={this.state.editable ? true : false}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nama_barang">Nama Barang</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama_barang"
                    placeholder="Enter Nama Barang"
                    onChange={this.handleChange}
                    value={this.state.nama_barang}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="text">Jumlah Barang</label>
                  <input
                    type="text"
                    className="form-control"
                    id="jumlah_barang"
                    placeholder="Enter Gambar Barang Name"
                    onChange={this.handleChange}
                    value={this.state.jumlah_barang}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gambar_barang">Gambar Barang</label>
                  <input
                    type="text"
                    className="form-control"
                    id="gambar_barang"
                    placeholder="Enter Gambar Barang Name"
                    onChange={this.handleChange}
                    value={this.state.gambar_barang}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="harga_barang">Harga Barang</label>
                  <input
                    type="text"
                    className="form-control"
                    id="harga_barang"
                    placeholder="Enter Harga Barang"
                    onChange={this.handleChange}
                    value={this.state.harga_barang}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={
                    this.state.editable === true
                      ? this.handleUpdateBarang
                      : this.handleAddBarang
                  }
                  data-dismiss="modal"
                >
                  {this.state.editable === true ? "Edit Data" : "Tambah Data"}
                </button>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;