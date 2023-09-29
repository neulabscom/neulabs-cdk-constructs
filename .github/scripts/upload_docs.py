#!/usr/bin/python3
import argparse
import os
import shlex
import subprocess
import sys

DEFAULT_BUCKET = 'neulabs-docs-swamp'


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--base-path', type=str, default='docs/')
    parser.add_argument(
        '--docs-name', type=str, default='docs', help='Docs folder name'
    )
    parser.add_argument('--project-name', type=str, required=True)
    parser.add_argument('--paths', type=str, nargs='+', default=[])

    args = parser.parse_args()

    if not os.path.isdir(args.base_path):
        sys.tracebacklimit = 0
        raise NotADirectoryError(f'"{args.base_path}" is not a directory')

    folders_to_upload = [
        (os.path.join(args.base_path, 'static', 'img'), ['neulabs/*']),
        (os.path.join(args.base_path, 'src', 'components'), []),
        (os.path.join(args.base_path, 'src', 'css'), []),
        (os.path.join(args.base_path, args.docs_name), []),
        (os.path.join(args.base_path, 'sidebars.js'), []),
    ]
    for path in args.paths:
        if os.path.isdir(path):
            folders_to_upload.append((path, []))
            continue
        else:
            sys.tracebacklimit = 0
            raise NotADirectoryError(f'"{path}" is not a directory')

    s3_base_path = f's3://{DEFAULT_BUCKET}/{args.project_name}/'

    for folder, exclude in folders_to_upload:
        s3_path = os.path.join(s3_base_path, folder.replace(args.base_path, ''))
        exclude_path = ' '.join([f'--exclude="{e}"' for e in exclude])
        if os.path.isdir(folder):
            cmd = f'aws s3 sync {folder} {s3_path} --delete {exclude_path}'
        else:
            cmd = f'aws s3 cp {folder} {s3_path}'

        print(f'Upload {folder} to {s3_path}')
        print(subprocess.check_output(shlex.split(cmd)).decode('utf-8'))

    return 0


if __name__ == '__main__':
    sys.exit(main())
