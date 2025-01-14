import { useNavigate, useParams } from "react-router"
import { OneNewType } from "../../../../store/features/newSlice/types/news-types"
import { useAppDispatch, useAppSelector } from "../../../../store/store"
import { useEffect, useState } from "react"
import { CustomTextField } from "../../../../components/text-field/custom-text-field"
import { CustomTextArea } from "../../../../components/text-area/text-area"
import { CustomButton } from "../../../../components/my-button/my-button"
import { UploadComponent2 } from "../../../widgets/image-upload-form/image-upload-form"
import { newsSliceThunks } from "../../../../store/features/newSlice/model/news-thunks"
import { AddNewThunkReqType, UpdateNewThunkReqType } from "../../../../store/features/newSlice/types/news-thunk-types"
import dayjs from "dayjs"
import { PATHS } from "../../../../router/router"

import "./separate-new.scss"
import { CREATE_NEW_ENTETY } from "../../../../shared/consts"
import { newsSliceActions } from "../../../../store/features/newSlice/model/news-slice"

export const AdminSeparateNew = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { newId } = useParams()

    const currentNew: OneNewType | null = useAppSelector(state => state.newsSlice.currentNew)

    const [title, setTitle] = useState<string>(currentNew?.title || "")
    const [descr, setDescr] = useState<string>(currentNew?.description || "")
    const [addInfo, setAddInfo] = useState<string>(currentNew?.additionalInfo || "")
    const [link, setLink] = useState<string>(currentNew?.link || "")

    const initialImage: string = currentNew?.photo || ""  
    
    const [file, setFile] = useState<File | null>(initialImage && URL.revokeObjectURL(initialImage) || null);

    useEffect(() => {
        if (newId && newId !== CREATE_NEW_ENTETY) {
            dispatch(newsSliceThunks.getById( { newId } ))
        }
    }, [])

    useEffect(() => {
        if (newId === CREATE_NEW_ENTETY) {
            dispatch(newsSliceActions.setCurrentNew(null))
        }
        setTitle(currentNew?.title || "")
        setDescr(currentNew?.description || "")
        setAddInfo(currentNew?.additionalInfo || "")
        setLink(currentNew?.link || "")
    }, [currentNew])

    useEffect(() => {
        if (initialImage) {
          fetch(initialImage, { mode: 'no-cors' })
            .then((response) => response.blob())
            .then((blob) => {
              const existingFile = new File([blob], "existing-image.jpg", { type: blob.type });
              setFile(existingFile);
            })
            .catch((error) => console.error("Ошибка при загрузке initialPreview:", error));
        }
      }, [initialImage]);


    const onAddNewBtnClick = () => {
        // console.log('file=', file);
        const data: AddNewThunkReqType = {
            date: dayjs().toString(),
            title,
            description: descr,
            additionalInfo: addInfo,
            link,
            file,
        }
        dispatch(newsSliceThunks.addNew(data))
        navigate(PATHS.admin.news)
    }

    const onEditNewBtnClick = () => {
        if (newId) {
            const data: UpdateNewThunkReqType = {
                id: newId,
                date: currentNew?.date || dayjs().toString(),
                title,
                description: descr,
                additionalInfo: addInfo,
                link,
                file,
            }
            dispatch(newsSliceThunks.updateNew(data))
            navigate(PATHS.admin.news)
        }
    }

    const onDeleteNewClick = () => {
        if (newId) {
            const answer: boolean = window.confirm("Удалить новость?")
            if (answer) {
                dispatch(newsSliceThunks.deleteNew({ newId }))
                navigate(PATHS.admin.news)
            }
        }
    }

    return (
        <div className="admin-separate-new-wrapper">
            {newId && newId !== CREATE_NEW_ENTETY
                ? <h3>Редактирование новости:</h3>
                : <h3>Создание новости:</h3>
            }

            <div>
                <div>Заголовок:</div>
                <CustomTextField value={title} onChange={(newVal: string) => setTitle(newVal)} 
                    additionalClass="admin-separate-new-text-align" />
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
                    additionalClass="admin-separate-new-text-align" />
            </div>

            {/* <UploadImage /> */}

            <div>
                <h4>Форма загрузки фотографии</h4>
                {/* <UploadComponent file={file} setFile={setFile} onUpload={uploadPhotoOnServer} /> */}
                <UploadComponent2 file={file} setFile={setFile} initialPreview={initialImage} />

            </div>

            {newId && newId !== CREATE_NEW_ENTETY
                ? <CustomButton title="Редактировать новость" onPress={onEditNewBtnClick} />
                : <CustomButton title="Создать новость" onPress={onAddNewBtnClick} />
            }
            


            {newId && 
                <CustomButton title="Удалить новость" onPress={onDeleteNewClick} class="admin-separate-new-delete-btn" />
            }
        </div>
    )
}