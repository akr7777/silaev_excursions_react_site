import { useParams } from "react-router"
import { OneNewType } from "../../../../store/features/newSlice/types/news-types"
import { useAppSelector } from "../../../../store/store"
import { useEffect, useState } from "react"
import { CustomTextField } from "../../../../components/text-field/custom-text-field"
import { CustomTextArea } from "../../../../components/text-area/text-area"
import { CustomButton } from "../../../../components/my-button/my-button"
import { UploadComponent2 } from "../../../widgets/image-upload-form/image-upload-form"

import "./separate-event.scss"

export const AdminSeparateEvent = () => {
    const { newId } = useParams()

    const events: OneNewType[] = useAppSelector(state => state.eventSlice.events)
    const currentEvent: OneNewType | undefined = events.find(n => n.id === newId)

    const [title, setTitle] = useState<string>(currentEvent?.title || "")
    const [descr, setDescr] = useState<string>(currentEvent?.description || "")
    const [addInfo, setAddInfo] = useState<string>(currentEvent?.additionalInfo || "")
    const [link, setLink] = useState<string>(currentEvent?.link || "")

    const initialImage: string = currentEvent?.photo || ""
    
    const [file, setFile] = useState<File | null>(initialImage && URL.revokeObjectURL(initialImage) || null);

    useEffect(() => {
        if (initialImage) {
          fetch(initialImage)
            .then((response) => response.blob())
            .then((blob) => {
              const existingFile = new File([blob], "existing-image.jpg", { type: blob.type });
              setFile(existingFile);
            })
            .catch((error) => console.error("Ошибка при загрузке initialPreview:", error));
        }
      }, [initialImage]);


    const onPostEventBtnClick = () => {
        console.log('file=', file);
        
    }
    const onDeleteEventClick = () => {}

    return (
        <div className="admin-separate-event-wrapper">
            <h3>Редактирование мероприятия:</h3>

            <div>
                <div>Заголовок:</div>
                <CustomTextField value={title} onChange={(newVal: string) => setTitle(newVal)} 
                    additionalClass="admin-separate-event-text-align" />
            </div>

            <div>
                <div>Описание:</div>
                <CustomTextArea value={descr} onChange={(newVal: string) => setDescr(newVal)} />
            </div>

            <div>
                <div>Доп.информания:</div>
                <CustomTextArea value={addInfo} onChange={(newVal: string) => setAddInfo(newVal)} />
            </div>

            <div>
                <div>Ссылка:</div>
                <CustomTextField value={link} onChange={(newVal: string) => setLink(newVal)} 
                    additionalClass="admin-separate-event-text-align" />
            </div>

            {/* <UploadImage /> */}

            <div>
                <h4>Форма загрузки фотографии</h4>
                {/* <UploadComponent file={file} setFile={setFile} onUpload={uploadPhotoOnServer} /> */}
                <UploadComponent2 file={file} setFile={setFile} initialPreview={initialImage} />

            </div>

            <CustomButton title="Отправить" onPress={onPostEventBtnClick} />


            <CustomButton title="Удалить мероприятие" onPress={onDeleteEventClick} />
        </div>
    )
}