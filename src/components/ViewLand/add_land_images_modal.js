import React, {Component} from 'react';
import Dropzone from "react-dropzone";
import Swal from "sweetalert2";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeRequest} from "../../helpers/network_utils";
import endpoints from "../../constants/endpoints";
import {POST_REQUEST} from "../../values/globals";
import {parseErrorResponse} from "../../helpers/helper_functions";

const $ = window.$;
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const dataURItoBlob = (dataURI) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    let byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    let ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    return new Blob([ab], {type: mimeString});

}

class AddImageModal extends Component {

    state = {
        images: [],
        loading: false,
    }
    uploadImage = () => {
        let {images} = this.state;
        if (images.length < 1) return;
        const {id} = this.props.match?.params;
        this.setState({
            loading: true,
            images: images,
        })
        let data = new FormData();
        let image = images[0];
        data.append("image", dataURItoBlob(image), "image.png");
        makeRequest(POST_REQUEST, endpoints.farmers_lands_images(id), data, () => {
            images.shift();
            if (images.length < 1) {
                this.handleFinish();
            } else {
                this.setState({
                    images: images,
                }, () => this.uploadImage());
            }

        }, (error) => {
            Swal.fire({
                title: 'Error!',
                text: `The remaining images could not be uploaded: "${parseErrorResponse(error)}`,
                icon: 'error',
                confirmButtonText: 'Ok'
            }).then(() => {
                this.handleFinish();
            })

        })
    }

    handleFinish = () => {
        $("#addImageModal").modal('toggle');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        this.props.callback();
    }

    imagesToBase64 = async (images) => {
        this.setState({loading: true})
        let formattedImages = [];
        for (let i = 0; i < images.length; i++) {
            formattedImages[i] = await toBase64(images[i]);
        }
        this.setState({
            images: formattedImages,
            loading: false
        })
    }

    render() {
        const {images, loading} = this.state;
        return (
            <div className="modal fade" id="addImageModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Upload Image</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Dropzone onDrop={acceptedFiles => this.imagesToBase64(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div {...getRootProps({className: "dropzone"})}>
                                            <input {...getInputProps({accept: "image/*"})} />
                                            <p>Drag 'n' drop images here, or click to select an image</p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                            <div className="row justify-content-center">
                                {
                                    images.map((image, index) => <div className="text-center" key={index}>
                                        {index === 0 && loading ?
                                            <CircularProgress size={"10rem"} className="p-3"/>
                                            :
                                            <img
                                                style={{width: "15rem", height: "10rem", objectFit: "cover"}}
                                                className="rounded p-3" src={image} alt="car"/>}
                                    </div>)
                                }
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={this.uploadImage} type="button" disabled={loading}
                                    className="btn btn-primary">{loading ? "Loading..." : "Save changes"}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddImageModal;