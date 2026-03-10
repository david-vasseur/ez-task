import ListPage from '@/components/features/ListPage';
import { getAllTreeAction } from '@/lib/actions/listAction';

interface Props {
    params: { slug: string };
}

async function page({ params }: Props) {
      
    const idParams = await params.slug;

    console.log(idParams);

    const id = Number(idParams);

    console.log(id);    

    const lists = await getAllTreeAction(id)

    if (!lists) return

    return (
        <ListPage lists={lists} />
    )
}

export default page;