import ListPage from '@/components/features/ListPage';
import { getAllTreeAction } from '@/lib/actions/listAction';

interface Props {
    params: { slug: string };
}

async function page({ params }: Props) {
  
    const familyId = Number(await params);

    const lists = await getAllTreeAction(familyId)

    if (!lists) return

    return (
        <ListPage lists={lists} />
    )
}

export default page;