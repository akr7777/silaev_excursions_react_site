import { OneNewType } from "../../../store/features/newSlice/types/news-types"
import { ChangeEvent, useEffect, useState } from "react"
import { CustomTextField } from "../../../components/text-field/custom-text-field"
import { CustomTextArea } from "../../../components/text-area/text-area"
import { CustomButton } from "../../../components/my-button/my-button"
import { UploadComponent2 } from "../../widgets/image-upload-form/image-upload-form"
import { AddNewThunkReqType, UpdateNewThunkReqType } from "../../../store/features/newSlice/types/news-thunk-types"
import dayjs, { Dayjs } from "dayjs"
import { CALENDAR_DATE_FORMAT, CREATE_NEW_ENTETY } from "../../../shared/consts"
import { OneEventType } from "../../../store/features/eventSlice/types/event-types"

import "./separate-item.scss"

type PropsType = {
    currentItem: OneNewType | OneEventType | null
    itemId: string | undefined
    setCurrentItem: (item: OneNewType | OneEventType | null) => void
    onCreateItemBtnClick: (data: AddNewThunkReqType) => void,
    onEditItemBtnClick: (data: UpdateNewThunkReqType) => void,
    onDeleteClick: (id: string) => void,
    onImageSaveFunction: (file: File | null) => void,
}

export const SeparateItem = ( {
    currentItem, itemId, 
    onImageSaveFunction,
    setCurrentItem, onCreateItemBtnClick, onEditItemBtnClick, onDeleteClick
} : PropsType ) => {

    const [date, setDate] = useState<Dayjs>(dayjs(currentItem?.date) || dayjs())
    const [title, setTitle] = useState<string>(currentItem?.title || "")
    const [descr, setDescr] = useState<string>(currentItem?.description || "")
    const [addInfo, setAddInfo] = useState<string>(currentItem?.additionalInfo || "")
    const [link, setLink] = useState<string>(currentItem?.link || "")

    const initialImage: string = currentItem?.photo || ""  
    
    const [file, setFile] = useState<File | null>(initialImage && URL.revokeObjectURL(initialImage) || null);
    // const [isPhotoChanged, setIsPhotoChanged] = useState<boolean>(false)

    useEffect(() => {
        if (itemId === CREATE_NEW_ENTETY) {
            setCurrentItem(null)
        }
        setDate(dayjs(currentItem?.date) || dayjs())
        setTitle(currentItem?.title || "")
        setDescr(currentItem?.description || "")
        setAddInfo(currentItem?.additionalInfo || "")
        setLink(currentItem?.link || "")
    }, [currentItem])

    useEffect(() => {
        if (initialImage) {
          fetch(initialImage)
            .then((response) => {
                return response.blob()
            })
            .then((blob) => {
                if (blob.size > 0) {
                    const existingFile = new File([blob], "existing-image" + dayjs().format() + ".jpg", { type: blob.type });
                    setFile(existingFile);
                }
              
            })
            .catch((error) => console.error("Ошибка при загрузке initialPreview:", error));
        }
      }, [initialImage]);


    const onAddNewBtnClick = () => {
        const data: AddNewThunkReqType = {
            date: date.format(),
            title,
            description: descr,
            additionalInfo: addInfo,
            link,
            file: file
        }
        onCreateItemBtnClick(data)
    }

    const onEditNewBtnClick = () => {
        if (itemId) {
            const data: UpdateNewThunkReqType = {
                id: itemId,
                date: date.format(),
                title,
                description: descr,
                additionalInfo: addInfo,
                link,
                file: file
            }
            onEditItemBtnClick(data)
        }
    }

    const onDeleteNewClick = () => {
        if (itemId) {
            onDeleteClick(itemId)
        }
    }

    return (
        <div className="separate-item-wrapper">
            {itemId && itemId !== CREATE_NEW_ENTETY
                ? <h3>Редактирование:</h3>
                : <h3>Создание:</h3>
            }

            <div>
                <input 
                    className="custom-text-field saparate-item-date-input"
                    type={"datetime-local"} 
                    value={date.format(CALENDAR_DATE_FORMAT)} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(dayjs(e.currentTarget.value))}
                />
            </div>

            <div>
                <div>Заголовок:</div>
                <CustomTextField value={title} onChange={(newVal: string) => setTitle(newVal)} />
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
                <CustomTextField value={link} onChange={(newVal: string) => setLink(newVal)} />
            </div>

            {/* <UploadImage /> */}

            <div>
                <h4>Форма загрузки фотографии</h4>
                {/* <UploadComponent file={file} setFile={setFile} onUpload={uploadPhotoOnServer} /> */}
                <UploadComponent2 
                    file={file} 
                    setFile={setFile} 
                    initialPreview={initialImage} 
                    onSaveFunctionName={(file: File | null) => onImageSaveFunction(file)}/>

            </div>

            <div className="separate-item-btn">
                {itemId && itemId !== CREATE_NEW_ENTETY
                    ? <CustomButton title="Редактировать" onPress={onEditNewBtnClick} />
                    : <CustomButton title="Создать" onPress={onAddNewBtnClick} />
                }
                


                {itemId && 
                    <CustomButton title="Удалить" onPress={onDeleteNewClick} class="separate-item-delete-btn" />
                }
            </div>
        </div>
    )
}