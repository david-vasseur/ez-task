import ListPage from '@/components/features/ListPage';
import { getAllTreeAction } from '@/lib/actions/listAction';

interface Props {
    params: { familyId: string };
}

async function page({ params }: Props) {
  
    const id = Number(await params.familyId);

    const lists = await getAllTreeAction(id)

    if (!lists) return

    return (
        <ListPage lists={lists} />
    )
}

export default page;