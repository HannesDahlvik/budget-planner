import React from 'react';
import { withStyles, Icon, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import Firebase from '../../Firebase';
import { Pie } from 'react-chartjs-2';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import ErrorHandler from '../../ErrorHandler';

const classes = (theme) => ({
    root: {
        display: 'grid',
        'grid-template-columns': 'repeat(2, 1fr)',
        'grid-template-rows': '1fr',
        'grid-column-gap': '20px',
        'grid-row-gap': '20px',
        padding: '100px 100px',
        width: '100%',
        height: '100%'
    },
    box: {
        float: 'left',
        backgroundColor: '#fff',
        'box-shadow': '5px 2px 25px -1px rgba(0,0,0,0.25)',
        padding: '25px'
    },
    side: {
        width: '100%',
        height: '100%'
    },
    height: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    infoPanel: {
        width: '100%',
        height: '100%'
    },
    rightPanel: {
        display: 'grid',
        'grid-template-columns': '1fr',
        'grid-template-rows': 'repeat(2, 1fr)',
        'grid-column-gap': '20px',
        'grid-row-gap': '20px'
    },
    accountCircle: {
        fontSize: '12.5em',
        marginBottom: '10px',
        color: '#333'
    },
    changerWrapper: {
        display: 'flex',
        alignItems: 'center',
        margin: '15px 0',
    },
    changeIcon: {
        marginLeft: '10px',
        cursor: 'pointer'
    },
    changeButton: {
        minWidth: 0,
        padding: '6px',
        margin: '0 10px'
    },
    redButton: {
        backgroundColor: '#ff0000',
        color: '#fff',

        '&:hover': {
            backgroundColor: '#dd0000',
            color: '#fff'
        }
    },
    pieChart: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    pieChartText: {
        marginBottom: '25px'
    },
    avatarWrapper: {
        position: 'relative',
        maxWidth: '256px',
        maxHeight: '256px',
        width: '100%',
        height: '100%'
    },
    avatar: {
        width: '100%',
        borderRadius: '50%'
    },
    avatarEditButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#f1f1f1',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: '3s all'
    },
    avatarEditButtonIcon: {
        fontSize: '4em'
    }
});

const fire = new Firebase();

class Profile extends React.Component {
    state = {
        showChangeUsername: false,
        showAvatarEditButton: false,
        showChangeAvatarModal: false,
        username: '',
        file: null,
        src: null,
        crop: {
            unit: '%',
            width: 30,
            aspect: 1 / 1,
        },
    }

    componentDidMount() {
        this.setState({ username: fire.auth.currentUser.displayName });
    }

    changeDisplayName = (e) => {
        e.preventDefault();

        fire.auth.currentUser.updateProfile({
            displayName: this.state.username
        });

        this.setState({ showChangeUsername: false });
    }

    changeAvatar = () => {
        this.setState({ showChangeAvatarModal: true });
    }

    handleClose = () => {
        this.setState({ showChangeAvatarModal: false });
    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                this.createRandomString(25)
            );
            this.setState({ croppedImageUrl });
        }
    }

    createRandomString(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    new ErrorHandler('Canvas is empty');
                    console.error('Canvas is empty');
                    return;
                }

                this.setState({ file: blob });

                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    saveAvatarChanges = async () => {
        await fire.doUploadProfilePicture(this.state.file, this.state.croppedImageUrl).then(imageURL => {
            fire.auth.currentUser.updateProfile({
                photoURL: imageURL
            }).then(() => {
                this.handleClose();
            }).catch(err => new ErrorHandler(err.message));
        }).catch(err => new ErrorHandler(err.message));

    }

    render() {
        const { username, crop, croppedImageUrl, src } = this.state;
        const { classes } = this.props;
        const data = {
            labels: ["hello", "yes", "no", "dsajkld", "dkl", "jdalk"],
            datasets: [{
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 0.5
            }]
        }

        const options = {
            legend: {
                position: 'right'
            }
        }

        return (
            <>
                {this.state.showChangeAvatarModal ? (
                    <Dialog
                        open={this.state.showChangeAvatarModal}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Change profile picture"}</DialogTitle>
                        <DialogContent>
                            <input onChange={this.onSelectFile} type="file" accept="image/*"></input>
                            {src && (
                                <ReactCrop
                                    src={src}
                                    crop={crop}
                                    ruleOfThirds
                                    onImageLoaded={this.onImageLoaded}
                                    onComplete={this.onCropComplete}
                                    onChange={this.onCropChange}
                                />
                            )}
                            {croppedImageUrl && (
                                <>
                                    <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                                </>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary" variant="contained">Cancel</Button>
                            <Button onClick={this.saveAvatarChanges} color="primary" variant="contained">Save</Button>
                        </DialogActions>
                    </Dialog>
                ) : (
                        <></>
                    )}

                <div className={`${classes.root} profile-page`}>
                    <div className={classes.infoPanel}>
                        <div className={`${classes.box} ${classes.height}`}>
                            <div className={classes.avatarWrapper}>
                                <img onMouseEnter={() => this.setState({ showAvatarEditButton: true })} onMouseLeave={() => this.setState({ showAvatarEditButton: false })} className={classes.avatar} src={fire.auth.currentUser.photoURL} alt="Avatar" />
                                {this.state.showAvatarEditButton ? (
                                    <div onClick={this.changeAvatar} onMouseEnter={() => this.setState({ showAvatarEditButton: true })} onMouseLeave={() => this.setState({ showAvatarEditButton: false })} className={classes.avatarEditButton}>
                                        <Icon className={classes.avatarEditButtonIcon}>add_a_photo</Icon>
                                    </div>
                                ) : (
                                        <></>
                                    )}
                            </div>
                            <div className={classes.changerWrapper}>
                                {this.state.showChangeUsername ? (
                                    <>
                                        <form onSubmit={(e) => this.changeDisplayName(e)}>
                                            <Button className={`${classes.changeButton} ${classes.redButton}`} variant="contained" onClick={() => this.setState({ showChangeUsername: false })}><Icon>clear</Icon></Button>
                                            <TextField defaultValue={fire.auth.currentUser.displayName} onChange={(e) => this.setState({ username: e.target.value })} />
                                            <Button className={classes.changeButton} color="primary" variant="contained" onClick={this.changeDisplayName}><Icon>done</Icon></Button>
                                        </form>
                                    </>
                                ) : (
                                        <>
                                            <Typography variant="h5">{username}</Typography>
                                            <Icon onClick={() => this.setState({ showChangeUsername: true })} className={classes.changeIcon}>create</Icon>
                                        </>
                                    )}
                            </div>
                            <Typography variant="h5">{fire.auth.currentUser.email}</Typography>
                        </div>
                    </div>
                    <div className={`${classes.infoPanel} ${classes.rightPanel} profile-right-info-panel`}>
                        <div className={`${classes.box} ${classes.side}`}>

                        </div>
                        <div className={`${classes.box} ${classes.side} ${classes.pieChart}`}>
                            <Typography className={classes.pieChartText} variant="h5">Text</Typography>
                            <Pie className={classes.chart} data={data} options={options} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withStyles(classes)(Profile);