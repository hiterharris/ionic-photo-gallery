import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet, IonText } from '@ionic/react';
import { camera, trash, close } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';
import './Photos.css'

const Photos: React.FC = () => {
  const { photos, takePhoto, deletePhoto, deleteAllPhotos } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const [deleteAllConfirmation, setDeleteAllConfirmation] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Photos</IonTitle>
            <IonText className='delete-all' onClick={() => setDeleteAllConfirmation(true)}>Delete All</IonText>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[
          {
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }
          },
          {
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          }
        ]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />
        <IonActionSheet
          isOpen={deleteAllConfirmation}
          buttons={[
          {
            text: 'Delete All',
            role: 'destructive',
            icon: trash,
            handler: () => deleteAllPhotos().then(() => window.location.reload())
          },
          {
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          }
        ]}
          onDidDismiss={() => null}
        />
      </IonContent>
    </IonPage>
  );
};

export default Photos;